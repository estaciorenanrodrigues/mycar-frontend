# MyCar Frontend

Aplicação Angular 16 para gestão de veículos com interface Material Design.

## Funcionalidades

- **Tela de Login**: Autenticação de usuários com validação de formulário
- **Listagem de Veículos**: Exibição de veículos em tabela com Material Design
- **Proteção de Rotas**: Verificação de autenticação antes de acessar páginas protegidas

## Tecnologias

- Angular 16
- Angular Material 16
- TypeScript 5.1
- RxJS

## Instalação

1. Instale as dependências:
```bash
npm install
```

## Execução

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── login/           # Componente de login
│   │   └── veiculos-list/   # Componente de listagem
│   ├── models/
│   │   └── veiculo.model.ts # Modelo de dados
│   ├── services/
│   │   ├── auth.service.ts  # Serviço de autenticação
│   │   └── veiculo.service.ts # Serviço de veículos
│   ├── app.component.*
│   ├── app.module.ts
│   └── app-routing.module.ts
├── index.html
├── main.ts
└── styles.scss
```

## Uso

1. Acesse a aplicação e você será redirecionado para a tela de login
2. Digite qualquer email e senha (mínimo 6 caracteres) para fazer login
3. Após o login, você será redirecionado para a listagem de veículos
4. Use o botão de logout no canto superior direito para sair

## Notas

- A autenticação é simulada (não há backend real)
- Os dados de veículos são mockados para demonstração
- Em produção, você precisará integrar com uma API real

