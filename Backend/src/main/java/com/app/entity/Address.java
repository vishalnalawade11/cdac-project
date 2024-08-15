package com.app.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Embeddable
public class Address {
	@Column(name = "city", length = 30)
	@NotBlank
	private String city;

	@NotBlank
	@Pattern(regexp = "\\d{6}", message = "pincode must be exactly 6 digits")
	private int pincode;

	@NotBlank
	private String state;

	public Address() {

	}

	public Address(@NotBlank String city, @NotBlank int pincode, @NotBlank String state) {
		super();
		this.city = city;
		this.pincode = pincode;
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getPincode() {
		return pincode;
	}

	public void setPincode(int pincode) {
		this.pincode = pincode;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
}
