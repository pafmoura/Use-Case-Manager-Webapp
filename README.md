# Use Case Manager (RedUCM)

## Introdução

O Use Case Manager (RedUCM) é uma aplicação web desenvolvida para centralizar e gerir os casos de uso e regras de deteção utilizados pela RedShift nos seus clientes. Este projeto visa solucionar a problemática da fragmentação de processos de gestão de segurança, proporcionando uma plataforma unificada para armazenamento, consulta e extração de informações relacionadas com a cibersegurança.

## Funcionalidades

- **Autenticação de Utilizadores:** Sistema de login para garantir que apenas utilizadores autorizados acedem à plataforma.
- **Gestão de Casos de Uso:** Armazenamento e organização dos diferentes casos de uso de acordo com várias taxonomias (MITRE ATT&CK, classificação interna do Centro Nacional de Cibersegurança, entre outros).
- **Regras de Deteção:** Associações de regras específicas a cada caso de uso, permitindo a sua extração e consulta.
- **Consulta e Pesquisa:** Interface intuitiva para a pesquisa e visualização de casos de uso e respetivas regras.
- **Exportação de Dados:** Funcionalidade para exportar informações em formatos utilizáveis para outras ferramentas e relatórios.

## Tecnologias Utilizadas

### Desenvolvimento de Software

- **Backend - Django:**
  - Framework Python especializada no desenvolvimento web utilizando o padrão MVT (Model-View-Template).
  - Utilizada para criar a API REST que comunica com o frontend.
  - Escolhida pela sua eficiência e pela necessidade de bibliotecas específicas em Python.

- **Frontend - Angular:**
  - Plataforma de desenvolvimento baseada em TypeScript, focada em Single-Page Applications (SPA).
  - Escolhida pela modularidade e capacidade de reutilização de código.

- **SGBD - Postgres:**
  - Sistema de gestão de base de dados open-source, reconhecido pela sua performance e escalabilidade.
  - Capacidade de armazenamento híbrido (relacional e não-relacional) através de entradas JSON.

## Como executar
pip install -r requirements.txt
npm install

python manage.py runserver
ng serve