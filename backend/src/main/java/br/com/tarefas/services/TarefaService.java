package br.com.tarefas.services;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.tarefas.exception.TarefaStatusException;
import br.com.tarefas.model.Tarefa;
import br.com.tarefas.model.TarefaStatus;
import br.com.tarefas.repository.TarefaRepository;

@Service
public class TarefaService {

	@Autowired
	private TarefaRepository repositorio;
	
	public List<Tarefa> getTodasTarefas() {
		return repositorio.findAll();
	}

	public List<Tarefa> getTarefasPorDescricao(String descricao) {
		return repositorio.findByDescricaoLike("%" + descricao + "%");
	}
	
	public Tarefa getTarefaPorId(Integer id) {
		return repositorio.findById(id).orElseThrow(() -> new EntityNotFoundException());
	}
	
	public Tarefa salvarTarefa(Tarefa tarefa) {
		return repositorio.save(tarefa);
	}
	
	public void deleteById(Integer id) {
		repositorio.deleteById(id);
	}
	
	public Tarefa iniciarTarefaPorId(Integer id) {
		Tarefa tarefa = getTarefaPorId(id);
		
		if (!TarefaStatus.ABERTO.equals(tarefa.getStatus()))
			throw new TarefaStatusException("Não é possível iniciar a tarefa com status " 
					+ tarefa.getStatus().name() );
		
		tarefa.setStatus(TarefaStatus.EM_ANDAMENTO);
		
		return salvarTarefa(tarefa);
	}
	
	public Tarefa concluirTarefaPorId(Integer id) {
		Tarefa tarefa = getTarefaPorId(id);
		
		if (TarefaStatus.CANCELADA.equals(tarefa.getStatus()))
			throw new TarefaStatusException("Não é possível concluir uma tarefa cancelada");
		
		tarefa.setStatus(TarefaStatus.CONCLUIDA);
		
		return salvarTarefa(tarefa);
	}

	public Tarefa cancelarTarefaPorId(Integer id) {
		Tarefa tarefa = getTarefaPorId(id);
		
		if (TarefaStatus.CONCLUIDA.equals(tarefa.getStatus())) 
			throw new TarefaStatusException("Não é possível cancelar uma tarefa concluída");
		
		tarefa.setStatus(TarefaStatus.CANCELADA);
		return salvarTarefa(tarefa);
	}
	
	
	
	
	
	
	
	
	
	
}
