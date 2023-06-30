package com.example.backend.aop;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * AdditionalAuthentication is a custom annotation to mark methods that require an additional JWT authentication.
 * Methods annotated with this annotation will have their JWT tokens validated prior to execution by the AdditionalAuthenticationAspect.
 * It's targeted at methods and retained at runtime.
 *
 * @author Your Name
 */
@Retention(RetentionPolicy.RUNTIME) // Annotation will be available at runtime
@Target(ElementType.METHOD) // This annotation can be used on methods
public @interface AdditionalAuthentication {
}
