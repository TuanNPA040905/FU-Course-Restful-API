
// Function to play video
function playVideo() {
    // Thêm logic phát video ở đây
    const currentLessonId = document.getElementById('currentLessonId').textContent;
    
    // Option 1: Mở modal video
    // showVideoModal(currentLessonId);
    
    // Option 2: Chuyển đến trang video player
    // window.location.href = `video-player.jsp?lessonId=${currentLessonId}`;
    
    // Option 3: Nhúng video player
    // embedVideoPlayer(currentLessonId);
    
    // Tạm thời alert
    console.log('Phát video bài học:', currentLessonId);
}

// Function to select a lesson
function selectLesson(lessonId, title, duration, completed) {
    // Cập nhật thông tin bài học hiện tại
    document.getElementById('currentLessonId').textContent = lessonId;
    document.getElementById('currentLessonTitle').textContent = title;
    document.getElementById('currentLessonDuration').textContent = duration;
    
    // Cập nhật mô tả (có thể lấy từ AJAX nếu cần)
    updateLessonDescription(lessonId);
    
    // Cập nhật trạng thái active cho các item
    updateActiveStates(lessonId);
    
    // Reinitialize icons after DOM update
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Scroll to top of video section on mobile
    if (window.innerWidth < 1024) {
        document.querySelector('.video-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Lưu bài học hiện tại vào session/localStorage nếu cần
    saveCurrentLesson(lessonId);
}

// Function to update active states
function updateActiveStates(lessonId) {
    // Cập nhật trạng thái active cho các lesson item
    const allLessonItems = document.querySelectorAll('.lesson-item');
    allLessonItems.forEach(item => {
        const itemLessonId = item.getAttribute('data-lesson-id');
        if (itemLessonId == lessonId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Cập nhật circle number
    const allCircles = document.querySelectorAll('.lesson-number-circle');
    allCircles.forEach(circle => {
        const parentItem = circle.closest('.lesson-item');
        const itemLessonId = parentItem.getAttribute('data-lesson-id');
        if (itemLessonId == lessonId) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });
}

// Function to update lesson description (có thể dùng AJAX)
function updateLessonDescription(lessonId) {
    // Option 1: Lấy mô tả từ server qua AJAX
    fetch(`/api/lessons/${lessonId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.description) {
                document.getElementById('currentLessonDescription').textContent = data.description;
            }
        })
        .catch(error => {
            console.error('Error fetching lesson description:', error);
            // Dùng mô tả mặc định nếu có lỗi
            useDefaultDescription();
        });
}

// Function to use default description
function useDefaultDescription() {
    document.getElementById('currentLessonDescription').textContent = 
        'Trong bài học này, bạn sẽ được tìm hiểu các khái niệm và kỹ thuật cơ bản, tạo nền tảng kiến thức vững chắc. ' +
        'Chúng ta sẽ đi qua các ví dụ thực tế và tình huống thực tiễn để giúp bạn hiểu cách áp dụng các nguyên tắc này một cách hiệu quả.';
}

// Function to save current lesson
function saveCurrentLesson(lessonId) {
    // Lưu vào localStorage
    try {
        const courseId = new URLSearchParams(window.location.search).get('courseId');
        if (courseId) {
            localStorage.setItem(`currentLesson_${courseId}`, lessonId);
        }
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
    
    // Hoặc gửi đến server
    /*
    fetch('/api/user/current-lesson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            courseId: courseId,
            lessonId: lessonId 
        })
    })
    .catch(error => console.error('Error saving current lesson:', error));
    */
}

// Function to mark lesson as completed
function markAsCompleted(lessonId) {
    // Gửi request đến server để cập nhật trạng thái
    fetch(`/api/lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Cập nhật UI
            updateCompletedUI(lessonId);
            
            // Cập nhật số lượng bài học đã hoàn thành
            updateCompletedCount();
            
            // Tự động chuyển sang bài học tiếp theo
            const nextLesson = findNextLesson(lessonId);
            if (nextLesson) {
                setTimeout(() => {
                    selectLesson(
                        nextLesson.id, 
                        nextLesson.title, 
                        nextLesson.duration, 
                        nextLesson.completed
                    );
                }, 1000);
            }
        }
    })
    .catch(error => console.error('Error marking as completed:', error));
}

// Function to update completed UI
function updateCompletedUI(lessonId) {
    const lessonItem = document.querySelector(`[data-lesson-id="${lessonId}"]`);
    if (lessonItem) {
        const statusDiv = lessonItem.querySelector('.lesson-status');
        statusDiv.innerHTML = '<i data-lucide="check-circle-2" class="completed-icon"></i>';
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Function to find next lesson
function findNextLesson(currentLessonId) {
    const allItems = Array.from(document.querySelectorAll('.lesson-item'));
    const currentIndex = allItems.findIndex(item => 
        item.getAttribute('data-lesson-id') == currentLessonId
    );
    
    if (currentIndex >= 0 && currentIndex < allItems.length - 1) {
        const nextItem = allItems[currentIndex + 1];
        return {
            id: nextItem.getAttribute('data-lesson-id'),
            title: nextItem.querySelector('.lesson-item-title').textContent,
            duration: nextItem.querySelector('.lesson-item-duration').textContent.trim(),
            completed: nextItem.querySelector('.completed-icon') !== null
        };
    }
    
    return null;
}

// Function to update completed count
function updateCompletedCount() {
    // Lấy thông tin mới từ server
    const courseId = new URLSearchParams(window.location.search).get('courseId');
    
    fetch(`/api/courses/${courseId}/progress`)
        .then(response => response.json())
        .then(data => {
            const infoItems = document.querySelectorAll('.info-item');
            if (infoItems.length > 1) {
                infoItems[1].textContent = 
                    `Đã hoàn thành ${data.completedCount}/${data.totalLessons} bài học`;
            }
        })
        .catch(error => console.error('Error updating progress:', error));
}

// Function to go back to courses
function goBackToCourses() {
    window.location.href = 'my-courses.jsp';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Restore last viewed lesson from localStorage
    restoreLastLesson();
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
});

// Function to restore last lesson
function restoreLastLesson() {
    try {
        const courseId = new URLSearchParams(window.location.search).get('courseId');
        if (courseId) {
            const lastLessonId = localStorage.getItem(`currentLesson_${courseId}`);
            if (lastLessonId) {
                const lessonItem = document.querySelector(`[data-lesson-id="${lastLessonId}"]`);
                if (lessonItem) {
                    lessonItem.click();
                }
            }
        }
    } catch (error) {
        console.error('Error restoring last lesson:', error);
    }
}

// Function to handle keyboard navigation
function handleKeyboardNavigation(e) {
    // Arrow Up: Previous lesson
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateToPreviousLesson();
    }
    
    // Arrow Down: Next lesson
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateToNextLesson();
    }
    
    // Space or Enter: Play video
    if (e.key === ' ' || e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (!activeElement.classList.contains('lesson-item')) {
            e.preventDefault();
            playVideo();
        }
    }
}

// Function to navigate to previous lesson
function navigateToPreviousLesson() {
    const currentLessonId = document.getElementById('currentLessonId').textContent;
    const allItems = Array.from(document.querySelectorAll('.lesson-item'));
    const currentIndex = allItems.findIndex(item => 
        item.getAttribute('data-lesson-id') == currentLessonId
    );
    
    if (currentIndex > 0) {
        allItems[currentIndex - 1].click();
    }
}

// Function to navigate to next lesson
function navigateToNextLesson() {
    const currentLessonId = document.getElementById('currentLessonId').textContent;
    const nextLesson = findNextLesson(currentLessonId);
    
    if (nextLesson) {
        const lessonItem = document.querySelector(`[data-lesson-id="${nextLesson.id}"]`);
        if (lessonItem) {
            lessonItem.click();
        }
    }
}