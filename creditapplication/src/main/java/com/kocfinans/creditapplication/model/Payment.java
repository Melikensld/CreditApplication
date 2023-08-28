package com.kocfinans.creditapplication.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "credit_talep_no", referencedColumnName = "talepNo")
    private Credit credit;

    private Double taksitTutari;

    private Date taksitTarihi;

    private Boolean odendi;



    public Payment() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Credit getCredit() {
        return credit;
    }

    public void setCredit(Credit credit) {
        this.credit = credit;
    }

    public Double getTaksitTutari() {
        return taksitTutari;
    }

    public void setTaksitTutari(Double taksitTutari) {
        this.taksitTutari = taksitTutari;
    }

    public Date getTaksitTarihi() {
        return taksitTarihi;
    }

    public void setTaksitTarihi(Date taksitTarihi) {
        this.taksitTarihi = taksitTarihi;
    }

    public Boolean getOdendi() {
        return odendi;
    }

    public void setOdendi(Boolean odendi) {
        this.odendi = odendi;
    }
}
