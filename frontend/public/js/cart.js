/**
 * Cart Functions - Add to Cart với AJAX
 * Sử dụng cho tất cả các trang có add to cart
 */

$(document).ready(function () {

    // Xử lý form add to cart
    $(document).on("submit", ".add-to-cart-form", function (e) {
        e.preventDefault();

        var form = $(this);
        var button = form.find('button[type="submit"]');
        var originalText = button.html();
        var shouldResetButton = true;

        

        $.ajax({
            url: form.attr('action'),
            type: 'POST',

            success: function (res) {
                if (res.trim() === 'ADD_SUCCESS') {
                    updateCartBadge();
                    showSuccessToast('Đã thêm khóa học vào giỏ hàng');
                    button.html('ĐÃ THÊM').prop('disabled', true);
                    shouldResetButton = false;
                }
            },

            error: function (xhr) {
                if (xhr.status === 409) {
                    showErrorToast('Bạn đã đăng ký khóa học này rồi');
                    button.html('Đã mua...').prop('disabled', true);
                    shouldResetButton = false;

                } else if (xhr.status === 401) {
                    showErrorToast('Vui lòng đăng nhập');
                    shouldResetButton = false;
                    setTimeout(() => location.href = '/login', 1500);
                } else {
                    showErrorToast('Có lỗi xảy ra');
                }
            },

            complete: function () {
                if (shouldResetButton) {
                    button.prop('disabled', false);
                    button.html(originalText);
                }
            }
        });

    });


    /**
     * Cập nhật số lượng badge giỏ hàng
     */
    function updateCartBadge() {
        var badge = $('#cart-count');

        if (badge.length) {
            var currentCount = parseInt(badge.text()) || 0;
            badge.text(currentCount + 1);

            // Animation
            badge.addClass('animate-pulse');
            setTimeout(function () {
                badge.removeClass('animate-pulse');
            }, 600);
        }
    }

    /**
     * Hiển thị thông báo thành công
     */
    function showSuccessToast(message) {
        $.toast({
            heading: 'Thành công!',
            text: message,
            icon: 'success',
            position: 'top-right',
            loader: true,
            loaderBg: '#10b981',
            hideAfter: 3000
        });
    }

    /**
     * Hiển thị thông báo lỗi
     */
    function showErrorToast(message) {
        $.toast({
            heading: 'Lỗi!',
            text: message,
            icon: 'error',
            position: 'top-right',
            hideAfter: 3000
        });
    }

    /**
     * Xử lý lỗi khi add to cart
     */
    function handleAddToCartError(xhr) {
        var errorMsg = 'Không thể thêm vào giỏ hàng';

        if (xhr.status === 401 || xhr.status === 302) {
            errorMsg = 'Vui lòng đăng nhập để thêm khóa học';
            showErrorToast(errorMsg);

            // Redirect sau 1.5s
            setTimeout(function () {
                window.location.href = '/login';
            }, 1500);
        } else {
            showErrorToast(errorMsg);
        }
    }

});

/**
 * Animation CSS cho badge
 */
if (!document.querySelector('style[data-cart-animation]')) {
    var style = document.createElement('style');
    style.setAttribute('data-cart-animation', 'true');
    style.innerHTML = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
        
        .animate-pulse {
            animation: pulse 0.6s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}