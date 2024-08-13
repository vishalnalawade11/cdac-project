package com.app.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "customers")
public class Customer implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Column(name = "cust_id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "aadhar_no", length = 12, unique = true)
	@NotBlank
	@Size(min = 12, max = 12)
	@Pattern(regexp = "\\d{12}", message = "Aadhar number must be exactly 12 digits")
	private String aadharNumber;

	@Column(name = "cust_name", length = 50)
	private String CustomerName;

	@OneToMany(mappedBy = "customer")
	private List<Sales> salesList;
}