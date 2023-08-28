package com.kocfinans.creditapplication.service;

import com.kocfinans.creditapplication.model.Credit;

import java.util.List;

public interface CreditService {
    public Credit createCredit(Credit credit);
    Credit getCreditByTalepNo(String talepNo);

    List<Credit> getAllApplications();

    Credit updateCredit(Credit credit);
    void deleteCredit(Credit credit);
}
