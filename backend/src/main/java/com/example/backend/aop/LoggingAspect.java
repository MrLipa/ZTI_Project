package com.example.backend.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;

/**
 * LoggingAspect class provides a central place of code that logs entering and leaving methods.
 * This class uses Spring AOP (Aspect Oriented Programming) to achieve this.
 * AspectJ annotations are used to define join points and advice.
 *
 * @author Your Name
 */
@Aspect
@Component
@EnableAspectJAutoProxy
public class LoggingAspect {

    /**
     * Logger instance for this class.
     */
    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    /**
     * Pointcut that matches all public methods in the package 'com.example.backend' and its subpackages.
     */
    @Pointcut("execution(* com.example.backend..*(..))")
    private void anyPublicMethod() {
    }

    /**
     * Advice that logs methods before their execution.
     *
     * @param joinPoint provides detail information about method, which is being advised.
     */
    @Before("anyPublicMethod()")
    public void beforeAnyPublicMethod(JoinPoint joinPoint) {
        log.info(" :: before :: " + joinPoint.getSignature().getName());
    }

    /**
     * Advice that logs methods after their execution.
     *
     * @param joinPoint provides detail information about method, which is being advised.
     */
    @After("anyPublicMethod()")
    public void afterAnyPublicMethod(JoinPoint joinPoint) {
        log.info(" :: after :: " + joinPoint.getSignature().getName());
    }

    /**
     * Advice that logs the execution time of methods and catches any exceptions thrown by methods in the package 'com.example.backend.controller' and its subpackages.
     *
     * @param joinPoint provides detail information about method, which is being advised.
     * @return the result of the method execution.
     * @throws Throwable if an error occurs during method execution.
     */
    @Around("execution(* com.example.backend.controller..*(..))")
    public Object aroundControllerMethod(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.nanoTime();
        Object proceed;
        try {
            proceed = joinPoint.proceed();
            log.info(" :: Time :: " + (System.nanoTime() - start) + " ns");
        } catch (Throwable throwable) {
            log.error("Exception in " + joinPoint.getSignature().getName() + " :: ", throwable);
            throw throwable;
        }
        return proceed;
    }
}
