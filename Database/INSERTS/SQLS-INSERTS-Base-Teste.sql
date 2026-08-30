-- ============================================
-- INSERTS - USERS
-- ============================================

INSERT INTO Users (
    NAME_USER,
    EMAIL,
    PASSOWORD_HASH,
    CREATE_AT,
    UPDATED_T
) VALUES
(
    'Davi Nunes',
    'davi.nunes@email.com',
    '$2b$10$ExemploHashSenhaDavi123456789',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Lucas Almeida',
    'lucas.almeida@email.com',
    '$2b$10$ExemploHashSenhaLucas123456789',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Mariana Silva',
    'mariana.silva@email.com',
    '$2b$10$ExemploHashSenhaMariana123456789',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Gabriel Santos',
    'gabriel.santos@email.com',
    '$2b$10$ExemploHashSenhaGabriel123456789',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'Ana Oliveira',
    'ana.oliveira@email.com',
    '$2b$10$ExemploHashSenhaAna123456789',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);


-- ============================================
-- INSERTS - APPLICATIONS
-- ============================================

INSERT INTO Applications (
    ID_USER_FK,
    COMPANY,
    SECTOR,
    COMPANY_LINKEDIN,
    CITY,
    PLATFORM,
    JOB_TITLE,
    LEVEL,
    WORK_MODEL,
    APPLICATION_DATE,
    STATUS,
    RECRUITER,
    CONTACT,
    SALARY,
    JOB_URL,
    NOTES
) VALUES
(
    1,
    'Nubank',
    'Tecnologia',
    'https://www.linkedin.com/company/nubank/',
    'São Paulo',
    'LinkedIn',
    'Desenvolvedor Full Stack',
    'JUNIOR',
    'HYBRID',
    '2026-08-20',
    'APPLIED',
    'Carlos Mendes',
    'carlos.mendes@nubank.com',
    4500.00,
    'https://nubank.com.br/carreiras/',
    'Candidatura realizada pelo LinkedIn.'
),
(
    2,
    'TOTVS',
    'Desenvolvimento de Software',
    'https://www.linkedin.com/company/totvs/',
    'São Paulo',
    'Gupy',
    'Desenvolvedor Backend',
    'JUNIOR',
    'ONSITE',
    '2026-08-18',
    'INTERVIEW',
    'Fernanda Costa',
    'fernanda.costa@totvs.com',
    4200.00,
    'https://www.totvs.com/carreiras/',
    'Entrevista inicial agendada.'
),
(
    3,
    'Itaú Unibanco',
    'Tecnologia da Informação',
    'https://www.linkedin.com/company/itau-unibanco/',
    'São Paulo',
    'LinkedIn',
    'Desenvolvedor Java',
    'JUNIOR',
    'HYBRID',
    '2026-08-15',
    'TECHNICAL_TEST',
    'Rafael Souza',
    'rafael.souza@itau.com.br',
    5000.00,
    'https://carreiras.itau.com.br/',
    'Teste técnico enviado por e-mail.'
),
(
    4,
    'Microsoft',
    'Tecnologia',
    'https://www.linkedin.com/company/microsoft/',
    'São Paulo',
    'Site da empresa',
    'Software Engineer',
    'MID',
    'REMOTE',
    '2026-08-10',
    'REJECTED',
    'Juliana Martins',
    'juliana.martins@microsoft.com',
    8500.00,
    'https://careers.microsoft.com/',
    'Candidatura encerrada após processo seletivo.'
),
(
    5,
    'Mercado Livre',
    'E-commerce e Tecnologia',
    'https://www.linkedin.com/company/mercadolibre/',
    'Osasco',
    'LinkedIn',
    'Desenvolvedor Backend',
    'JUNIOR',
    'HYBRID',
    '2026-08-22',
    'APPROVED',
    'Bruno Ferreira',
    'bruno.ferreira@mercadolivre.com',
    6000.00,
    'https://jobs.mercadolivre.com/',
    'Aprovada no processo seletivo.'
);