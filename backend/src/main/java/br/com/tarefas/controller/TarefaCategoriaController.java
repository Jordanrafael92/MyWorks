package br.com.tarefas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.tarefas.model.TarefaCategoria;
import br.com.tarefas.repository.TarefaCategoriaRepository;

@RestController
public class TarefaCategoriaController {

	@Autowired
	private TarefaCategoriaRepository repositorio;
	
	@GetMapping("/categoria")
	public List<TarefaCategoria> todasCategorias() {
		return repositorio.findAll();
	}
	
	@GetMapping("/categoria/{id}")
	public TarefaCategoria umaCategoria(@PathVariable Integer id) {
		return repositorio.findById(id).orElse(null);
	}
	
	@PostMapping("/categoria")
	public TarefaCategoria salvarCategoria(@RequestBody TarefaCategoria categoria) {
		return repositorio.save(categoria);
	}
	
	@DeleteMapping("/categoria/{id}")
	public void excluirTarefa(@PathVariable Integer id) {
		repositorio.deleteById(id);
	}
	
}
