package br.com.tarefas.services;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.tarefas.exception.TarefaStatusExeption;
import br.com.tarefas.model.Tarefa;
import br.com.tarefas.model.TarefaStatus;
import br.com.tarefas.repository.TarefaRepository;

@Service
public class TarefaService {

	@Autowired
	private TarefaRepository repository;
	
	public List<Tarefa> getTodasTarefas(){
		return repository.findAll();
	}
	
	public List<Tarefa> getTarefasPorDescricao(String descricao){
		return repository.findByDescricaoLike("%" + descricao + "%");
	}
	
	public Tarefa getTarefaPorId(Integer id) {
		return repository.findById(id).orElseThrow(() -> new EntityNotFoundException());
	}
	
	public Tarefa salvarTarefa(Tarefa tarefa) {
		return repository.save(tarefa);
	}
	
	public void deleteById(Integer id) {
		repository.deleteById(id);
	}
	
	public Tarefa iniciarTarefaPorId(Integer id) {
		Tarefa tarefa = getTarefaPorId(id);
		
		if (!TarefaStatus.ABERTO.equals(tarefa.getStatus()))
			throw new TarefaStatusExeption();
		
		tarefa.setStatus(TarefaStatus.EM_ANDAMENTO);
		repository.save(tarefa);
		return tarefa;
	}
}
