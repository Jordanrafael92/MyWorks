package br.com.tarefas.exception;

public class TarefaStatusExeption extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public TarefaStatusExeption() {
		super();

	}

	public TarefaStatusExeption(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);

	}

	public TarefaStatusExeption(String message, Throwable cause) {
		super(message, cause);

	}

	public TarefaStatusExeption(String message) {
		super(message);

	}

	public TarefaStatusExeption(Throwable cause) {
		super(cause);

	}

	
}
