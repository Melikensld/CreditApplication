package com.kocfinans.creditapplication.controller;

import com.kocfinans.creditapplication.model.Credit;
import com.kocfinans.creditapplication.service.CreditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/credit")
public class CreditController {
    @Autowired
    private CreditService creditService;

    @PostMapping("/create")
    public String add(@RequestBody Credit credit){
        creditService.createCredit(credit);
        return "New credit is added";
    }

    @GetMapping("/getApplication")
    public ResponseEntity<Credit> getApplication(@RequestParam("talepNo") String talepNo){
        Credit credit = creditService.getCreditByTalepNo(talepNo);

        if (credit == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(credit);
    }

    @GetMapping("/getAllApplications")
    public List<Credit> getAllApplications() {
        return creditService.getAllApplications();
    }

    @PutMapping("/updateCredit/{talepNo}")
    public ResponseEntity<Credit> updateCredit(@PathVariable String talepNo, @RequestBody Credit updatedCredit) {
        Credit existingCredit = creditService.getCreditByTalepNo(talepNo);

        if (existingCredit == null) {
            return ResponseEntity.notFound().build();
        }

        existingCredit.setKrediDurum(updatedCredit.getKrediDurum());
        existingCredit.setFaturaTutari(updatedCredit.getFaturaTutari());
        existingCredit.setKrediTarihi(updatedCredit.getKrediTarihi());
        existingCredit.setVade(updatedCredit.getVade());
        existingCredit.setTaksitTutari(updatedCredit.getTaksitTutari());

        Credit savedCredit = creditService.updateCredit(existingCredit);
        return ResponseEntity.ok(savedCredit);
    }

    @DeleteMapping("/deleteCredit/{talepNo}")
    public ResponseEntity<Void> deleteCredit(@PathVariable String talepNo) {
        Credit existingCredit = creditService.getCreditByTalepNo(talepNo);

        if (existingCredit == null) {
            return ResponseEntity.notFound().build();
        }

        creditService.deleteCredit(existingCredit);
        return ResponseEntity.noContent().build();
    }
}
