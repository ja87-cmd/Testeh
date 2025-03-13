document.addEventListener('DOMContentLoaded', function() {
    // Lógica de cadastro de usuário
    document.getElementById('form-cadastro').addEventListener('submit', function(event) {
      event.preventDefault();
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
      const tipoUsuario = document.getElementById('tipo_usuario').value;
  
      // Lógica para salvar os dados do usuário
      console.log(`Nome: ${nome}, Email: ${email}, Senha: ${senha}, Tipo: ${tipoUsuario}`);
      alert('Usuário cadastrado com sucesso!');
      // Redirecionar para a página de agendamento
      window.location.href = 'painel_cliente.html';
    });
  
    // Lógica de login de usuário
    document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const senha = document.getElementById('password').value;
      const tipoUsuario = document.getElementById('tipo_usuario').value;
  
      // Lógica para verificar os dados de login
      console.log(`Email: ${email}, Senha: ${senha}, Tipo: ${tipoUsuario}`);
      alert('Login efetuado com sucesso!');
      // Redirecionar para a página de agendamento
      window.location.href = 'painel_cliente.html';
    });
  
    // Estrutura de dados para armazenar pacotes e serviços
    let pacotes = [];
  
    // Função para criar um novo pacote de serviços
    function criarPacote(nomePacote, itensServicos) {
      const pacote = {
        nome: nomePacote,
        itens: itensServicos.map(servico => ({ nome: servico, usado: false })),
        criadoEm: new Date(),
        expirado: false,
      };
      pacotes.push(pacote);
      console.log(`Pacote criado: ${nomePacote}`, pacote);
    }
  
    // Função para adicionar serviços ou pacotes ao carrinho
    function adicionarServicoOuPacote() {
      const servicoPacoteouPacote = document.getElementById('servicoPacote').value;
      const servicoPacoteText = document.getElementById('servicoPacote').selectedOptions[0].text;
      const carrinho = document.getElementById('carrinho');
      const item = document.createElement('div');
      item.textContent = servicoPacoteText;
      carrinho.appendChild(item);
      console.log(`Serviço/Pacote adicionado: ${servicoPacote}`);
      alert('Serviço/Pacote adicionado ao carrinho!');
    }
  
    // Função de finalização de compra
    function finalizarCompra() {
      const carrinho = document.getElementById('carrinho');
      const itens = carrinho.getElementsByTagName('div');
      let total = 0;
      const data = new Date().toLocaleDateString();
  
      for (let item of itens) {
        const itemText = item.textContent;
        const priceMatch = itemText.match(/R\$([0-9,]+)/);
        if (priceMatch) {
          const price = parseFloat(priceMatch[1].replace(',', '.'));
          total += price;
        }
      }
  
      const chavePix = gerarChavePix(total);
      const comprovante = `Comprovante de Pagamento e Agendamento\nData: ${data}\nValor: R$${total.toFixed(2)}\nChave PIX: ${chavePix}`;
      alert(comprovante);
    }
  
    // Função para gerar chave PIX
    function gerarChavePix(total) {
      const chavePix = `00020126360014BR.GOV.BCB.PIX0114+55119999999990220${total.toFixed(2).replace('.', '')}5204000053039865802BR5925ProcorteSystem6009Sao Paulo62070503***6304`;
      return chavePix;
    }
  
    // Função para adicionar múltiplos clientes ao agendamento
    function adicionarClientesAoAgendamento(clientes) {
      const duracaoPorCliente = 30; // minutos
      const duracaoTotal = clientes.length * duracaoPorCliente;
  
      const agendamento = {
        clientes: clientes,
        duracao: duracaoTotal,
        data: document.getElementById('data').value,
        hora: document.getElementById('time').value,
      };
  
      console.log(`Agendamento para ${clientes.length} clientes. Duração total: ${duracaoTotal} minutos.`);
      alert(`Agendamento para ${clientes.length} clientes. Duração total: ${duracaoTotal} minutos.`);
      console.log('Detalhes do agendamento:', agendamento);
  
      // Marcar horário como indisponível
      marcarHorarioIndisponivel(agendamento.data, agendamento.hora);
    }
  
    // Função para marcar horário como indisponível
    function marcarHorarioIndisponivel(data, hora) {
      const horarioSelect = document.getElementById('time');
      const options = horarioSelect.getElementsByTagName('option');
      for (let option of options) {
        if (option.value === hora) {
          option.disabled = true;
          option.textContent += ' (Indisponível)';
        }
      }
      console.log(`Horário ${hora} em ${data} marcado como indisponível.`);
    }
  
    // Lógica de agendamento
    document.getElementById('form-agenda').addEventListener('submit', function(event) {
      event.preventDefault();
      const clientes = [
        { nome: 'Cliente 1', servico: 'Corte de Cabelo' },
        { nome: 'Cliente 2', servico: 'Barba' }
        // Adicione mais clientes conforme necessário
      ];
      adicionarClientesAoAgendamento(clientes);
    });
  
    // Gerenciar a expiração de serviços não utilizados
    function verificarExpiracaoPacotes() {
      const agora = new Date();
      pacotes = pacotes.map(pacote => {
        if (!pacote.expirado && (agora - new Date(pacote.criadoEm)) / (1000 * 60 * 60 * 24) > 30) {
          pacote.expirado = true;
        }
        return pacote;
      });
    }
  
    // Verificar expiração de pacotes a cada 24 horas
    setInterval(verificarExpiracaoPacotes, 1000 * 60 * 60 * 24);
  
    // Função para criar horários
    function criarHorarios(periodo) {
      let horarios = [];
      let horaInicio, horaFim;
  
      if (periodo === 'manha') {
        horaInicio = 8 * 60; // 08:00
        horaFim = 11 * 60 + 30; // 11:30
      } else if (periodo === 'tarde') {
        horaInicio = 13 * 60; // 13:00
        horaFim = 18 * 60 + 30; // 18:30
      }
  
      for (let i = horaInicio; i <= horaFim; i += 30) {
        let horas = Math.floor(i / 60);
        let minutos = i % 60;
        horarios.push(`${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`);
      }
  
      return horarios;
    }
  
    // Exemplo de uso de criação de pacote
    criarPacote('Meu Pacote', ['Corte de Cabelo', 'Barba']);
  
    // Atualizar horários disponíveis
    function atualizarHorariosDisponiveis() {
      const periodo = document.querySelector('input[name="periodo"]:checked').value;
      const horarios = criarHorarios(periodo);
      const horarioSelect = document.getElementById('time');
      horarioSelect.innerHTML = '';
  
      horarios.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario;
        option.textContent = horario;
        horarioSelect.appendChild(option);
      });
    }
  
    // Evento para atualizar horários disponíveis quando o período é selecionado
    document.querySelectorAll('input[name="periodo"]').forEach(radio => {
      radio.addEventListener('change', atualizarHorariosDisponiveis);
    });
  
    // Inicializar horários disponíveis
    atualizarHorariosDisponiveis();
  });