package com.wellsfargo.training.lms.exception;

public class AuthenticationFailedException extends Exception{
    private static final long serialVersionUID = 1L;
    public AuthenticationFailedException(String message) {
        super(message);
    }
}
