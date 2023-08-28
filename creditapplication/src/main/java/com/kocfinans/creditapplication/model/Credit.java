package com.kocfinans.creditapplication.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Credit {
    @Id
    @Column(unique = true)
    private String talepNo;


    private Integer krediDurum;

    private Double faturaTutari;

    private Date krediTarihi;

    private Integer vade;

    private Double taksitTutari;

    public Credit() {
    }


    public String getTalepNo() {
        return talepNo;
    }

    public void setTalepNo(String talepNo) {
        this.talepNo = talepNo;
    }

    public Integer getKrediDurum() {
        return krediDurum;
    }

    public void setKrediDurum(Integer krediDurum) {
        this.krediDurum = krediDurum;
    }

    public Double getFaturaTutari() {
        return faturaTutari;
    }

    public void setFaturaTutari(Double faturaTutari) {
        this.faturaTutari = faturaTutari;
    }

    public Date getKrediTarihi() {
        return krediTarihi;
    }

    public void setKrediTarihi(Date krediTarihi) {
        this.krediTarihi = krediTarihi;
    }

    public Integer getVade() {
        return vade;
    }

    public void setVade(Integer vade) {
        this.vade = vade;
    }

    public Double getTaksitTutari() {
        return taksitTutari;
    }

    public void setTaksitTutari(Double taksitTutari) {
        this.taksitTutari = taksitTutari;
    }
}
