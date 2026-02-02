# MyCar Frontend

Aplicação Angular 16 para gestão completa de veículos com interface Material Design.

## Funcionalidades

- **Tela de Login**: Autenticação de usuários com validação de formulário
- **Listagem de Veículos**: Exibição de veículos em tabela Material Design com paginação, ordenação e busca
- **Criação de Veículos**: Formulário para cadastro de novos veículos com validações completas
- **Edição de Veículos**: Formulário para edição de veículos existentes
- **Exclusão de Veículos**: Funcionalidade para remover veículos do sistema
- **Proteção de Rotas**: Verificação de autenticação antes de acessar páginas protegidas
- **Navbar**: Barra de navegação com opções de logout

## Tecnologias

- Angular 16
- Angular Material 16
- TypeScript 5.1
- RxJS
- Angular Forms (Reactive Forms)
- Angular HttpClient

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Backend API rodando em `http://localhost:3000`

## Instalação

1. Clone o repositório `https://github.com/estaciorenanrodrigues/mycar-frontend.git`
2. Instale as dependências:
```bash
npm install
```

## Execução

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`

### Build para Produção

```bash
npm run build
```

### Executar Testes

```bash
npm test
```

## Estrutura do Projeto

```
src/
├── app/
│   ├── modules/                    # Módulos de telas
│   │   ├── login/                  # Tela de login
│   │   ├── veiculos-list/          # Tela de listagem
│   │   ├── veiculo-create/         # Tela de criação
│   │   └── veiculo-edit/           # Tela de edição
│   ├── shared/                     # Recursos compartilhados
│   │   ├── components/             # Componentes reutilizáveis
│   │   │   ├── navbar/             # Barra de navegação
│   │   │   └── tableListVehicles/  # Tabela de veículos
│   │   ├── models/                 # Modelos de dados
│   │   │   └── veiculo.model.ts    # Interfaces de veículo
│   │   └── services/               # Serviços
│   │       ├── auth.service.ts     # Serviço de autenticação
│   │       └── veiculo.service.ts  # Serviço de veículos
│   ├── routes/                     # Configuração de rotas
│   │   └── index.ts
│   ├── app.component.*
│   ├── app.module.ts
│   └── app-routing.module.ts
├── index.html
├── main.ts
└── styles.scss
```

## Rotas da Aplicação

- `/login` - Tela de login
- `/veiculos` - Listagem de veículos
- `/veiculos/create` - Criação de novo veículo
- `/veiculos/edit/:id` - Edição de veículo existente

## API Backend

A aplicação consome uma API REST que deve estar rodando em `http://localhost:3000` com os seguintes endpoints:

- `GET /list` - Lista veículos com paginação e ordenação
- `GET /search/:id` - Busca veículo por ID
- `GET /id` - Obtém próximo ID disponível
- `POST /create` - Cria novo veículo
- `PUT /update/:id` - Atualiza veículo existente
- `DELETE /delete/:id` - Remove veículo

## Uso

1. Certifique-se de que o backend está rodando em `http://localhost:3000`
2. Acesse a aplicação e você será redirecionado para a tela de login
3. Digite qualquer email e senha para fazer login (autenticação simulada)
4. Após o login, você será redirecionado para a listagem de veículos
5. Use os botões na interface para:
   - Criar novo veículo
   - Editar veículo existente
   - Excluir veículo
   - Fazer logout

## Validações de Formulário

Os formulários de criação e edição incluem as seguintes validações:

- **Placa**: Formato brasileiro (ABC1234 ou ABC1D23)
- **Chassi**: Exatamente 17 caracteres
- **Renavam**: Exatamente 11 caracteres
- **Modelo**: Campo obrigatório
- **Marca**: Campo obrigatório
- **Ano**: Entre 1900 e ano atual + 1

## Notas

- A autenticação é simulada usando localStorage (não há backend real de autenticação)
- Os dados de veículos são gerenciados pelo backend API
- Em produção, configure as variáveis de ambiente para apontar para a API de produção

