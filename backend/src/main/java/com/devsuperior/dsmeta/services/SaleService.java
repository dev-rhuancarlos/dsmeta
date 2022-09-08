package com.devsuperior.dsmeta.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.devsuperior.dsmeta.entities.Sale;
import com.devsuperior.dsmeta.repositories.SaleRepository;

@Service
public class SaleService {
	
	//Faz a importacao do repositorio para a classe
	@Autowired
	private SaleRepository repository;
	
	public Page<Sale> getSales(String minDate, String maxDate,Pageable pageable) {
		
		//Criar uma data com dia de HOJE
		LocalDate today =  LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());
		
		//Converte o valor que vem como STRING para o LocalDate
		LocalDate min =  minDate.equals("") ? today.minusYears(1) : LocalDate.parse(minDate);;
		
		LocalDate max =  maxDate.equals("") ? today : LocalDate.parse(maxDate);
		
		return repository.findSales(min, max, pageable);
	}

}
