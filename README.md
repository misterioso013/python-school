# Python School 🐍

Uma plataforma de aprendizado interativa para Python, com exercícios práticos, certificados e suporte a múltiplos idiomas.

## Tecnologias Utilizadas 🚀

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Clerk Authentication
- MongoDB + Prisma
- Next-Intl (Internacionalização)

## Configuração do Ambiente 🛠️

1. Clone o repositório:
```bash
git clone https://github.com/misterioso013/python-school.git
cd python-school
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
cp example.env .env.local
```
Edite o arquivo `.env.local` com suas credenciais.

4. Configure o banco de dados:
```bash
pnpm prisma generate
pnpm prisma db push
```

5. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

## Estrutura do Projeto 📁

- `/app` - Rotas e páginas da aplicação
- `/components` - Componentes reutilizáveis
- `/lib` - Utilitários e configurações
- `/prisma` - Schema do banco de dados
- `/public` - Arquivos estáticos
- `/languages` - Arquivos de tradução

## Funcionalidades Principais ✨

- 🔐 Autenticação de usuários
- 🌍 Suporte a múltiplos idiomas (pt-BR, en)
- 📝 Exercícios interativos de Python
- 🎓 Sistema de certificados
- 📊 Dashboard de progresso
- 📱 Design responsivo

## Contribuindo 🤝

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença 📄

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
