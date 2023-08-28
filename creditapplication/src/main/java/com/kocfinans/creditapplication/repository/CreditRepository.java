package com.kocfinans.creditapplication.repository;

import com.kocfinans.creditapplication.model.Credit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CreditRepository extends JpaRepository<Credit,Integer> {
    @Query("SELECT c FROM Credit c WHERE c.talepNo = :talepNo")
    Credit findByTalepNo(@Param("talepNo") String talepNo);

    @Modifying
    @Transactional
    @Query("UPDATE Credit c SET c.faturaTutari = :faturaTutari, c.vade = :vade, c.taksitTutari = :taksitTutari WHERE c.talepNo = :talepNo")
    void updateCredit(@Param("talepNo") String talepNo, @Param("faturaTutari") Double faturaTutari, @Param("vade") Integer vade, @Param("taksitTutari") Double taksitTutari);

    @Modifying
    @Transactional
    void deleteByTalepNo(String talepNo);
}
