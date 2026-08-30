```sql
-- ============================================================
-- VIEW: ViewGetAll
-- Retorna todas as aplicações cadastradas.
-- Ordena as aplicações pela data da candidatura,
-- mostrando as mais recentes primeiro.
-- ============================================================

CREATE VIEW ViewGetAll AS
SELECT
    ID_APP,
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
    NOTES,
    CREATED_AT,
    UPDATED_AT
FROM Applications
ORDER BY APPLICATION_DATE DESC;


-- ============================================================
-- CONSULTA: ViewGetAll
-- Exibe os dados armazenados na ViewGetAll.
-- ============================================================

SELECT *
FROM ViewGetAll;


-- ============================================================
-- VIEW: ViewFiltroOne
-- Retorna apenas as informações necessárias para
-- realizar filtros e pesquisas nas aplicações.
-- ============================================================

CREATE VIEW ViewFiltroOne AS
SELECT
    COMPANY,
    SECTOR,
    CITY,
    JOB_TITLE,
    LEVEL,
    WORK_MODEL,
    STATUS,
    SALARY,
    CONTACT,
    COMPANY_LINKEDIN
FROM Applications;


-- ============================================================
-- CONSULTA: ViewFiltroOne
-- Exibe os dados armazenados na ViewFiltroOne.
-- ============================================================

SELECT *
FROM ViewFiltroOne;
```
