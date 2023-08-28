package com.kocfinans.creditapplication.service;

import com.kocfinans.creditapplication.model.Credit;
import com.kocfinans.creditapplication.repository.CreditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CreditServiceImpl implements CreditService{
    @Autowired
    private CreditRepository creditRepository;

    @Override
    public Credit createCredit(Credit credit) {
        // Talep numarası oluşturulacak ve set edilecek
        String talepNo = generateRequestNumber(6);
        credit.setTalepNo(talepNo);

        // Değerlendirme yap ve kredi durumunu belirle
        int krediDurum = performEvaluation(credit);
        credit.setKrediDurum(krediDurum);

        return creditRepository.save(credit);
    }

    @Override
    public Credit getCreditByTalepNo(String talepNo) {
        return creditRepository.findByTalepNo(talepNo);
    }

    @Override
    public List<Credit> getAllApplications() {
        return creditRepository.findAll();
    }

    @Override
    public Credit updateCredit(Credit credit) {
        // Update the credit entity in the database
        return creditRepository.save(credit);
    }

    @Override
    public void deleteCredit(Credit credit) {
        // Delete the credit entity from the database
        creditRepository.delete(credit);
    }

    private int performEvaluation(Credit credit) {
        double faturaTutari = credit.getFaturaTutari();
        int vade = credit.getVade();
        double taksitTutari = credit.getTaksitTutari();

        // Örnek bir aritmetik işlem: faturaTutari * vade / taksitTutari
        double result = (faturaTutari * vade) / taksitTutari;

        if (result > 10000) {
            return 1; // Kredi reddedildi
        } else if (result < 500) {
            return 3; // Kredi onaylandı
        } else {
            return 2; // Bekleme durumu
        }
    }

    private String generateRequestNumber(int length) {

        String characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * characters.length());
            sb.append(characters.charAt(index));
        }

        return sb.toString();
    }
}
