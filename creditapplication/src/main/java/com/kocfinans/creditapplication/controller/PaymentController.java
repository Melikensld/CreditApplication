package com.kocfinans.creditapplication.controller;

import com.kocfinans.creditapplication.model.Payment;
import com.kocfinans.creditapplication.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/createPaymentRecords")
    public String add(@RequestBody Payment payment){
        paymentService.createPayment(payment);
        return "New payment is added";
    }
}
