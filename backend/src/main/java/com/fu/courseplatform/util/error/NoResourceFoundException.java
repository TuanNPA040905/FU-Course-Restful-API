package com.fu.courseplatform.util.error;

public class NoResourceFoundException extends RuntimeException {
    public NoResourceFoundException(String message) {
        super(message);
    }
}
