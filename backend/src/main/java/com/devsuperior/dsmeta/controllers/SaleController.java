package com.devsuperior.dsmeta.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.dsmeta.entities.Sale;
import com.devsuperior.dsmeta.services.SaleService;
import com.devsuperior.dsmeta.services.SmsService;

@RestController
@RequestMapping(value = "/sales")
public class SaleController {
	
	@Autowired
	private SaleService service;
	
	@Autowired
	private SmsService smsService;

	@GetMapping
	public Page<Sale> getSales(
			@RequestParam(value="minDate", defaultValue = "") String  minDate,
			@RequestParam(value="maxDate", defaultValue = "") String maxDate,
			Pageable pageable){
		return service.getSales(minDate, maxDate, pageable);		
	}
	
	//"Rotas" dentro de "rotas" sao chamas subsequentes
	//EX: /sales/notification
	@GetMapping("/{id}/notification")
	public void notifySms(@PathVariable Long id) {
		try {
			smsService.sendSms(id);
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			System.out.println("smsEnviado");
		}
		
	}
}
