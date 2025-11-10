package com.example.TechnoShark.SchoolRanking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequestMapping("/")
public class SchoolRankingApplication {

	public static void main(String[] args) {
		SpringApplication.run(SchoolRankingApplication.class, args);
		// System.out.println("you");
		// System.out.println(new BCryptPasswordEncoder().encode("XxXx9900"));
		// System.out.println("ahmed");
		// System.out.println(new BCryptPasswordEncoder().encode("XxXx9900"));
		// System.out.println("le5er");
		// System.out.println(new BCryptPasswordEncoder().encode("XxXx9900"));



		// * you can use EntityManager.getReference(...) instead of fetching and
		// refrenching the whole Entity to add it as a foreign object to a new Entity
	}

	@GetMapping
	public String getMethodName() {
		return "xnxx";
	};

}
