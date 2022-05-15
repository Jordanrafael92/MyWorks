package br.com.tarefas.controller.request;

public class RoleRequest {
	private String name;
	
	@SuppressWarnings("unused")
	private String getName() {
		return name;
	}
	
	@SuppressWarnings("unused")
	private void setName(String name) {
		this.name = name;
	}
}
