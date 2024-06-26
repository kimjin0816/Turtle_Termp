CREATE TABLE IF NOT EXISTS MEMBERSHIP
(
    MEM_ID          VARCHAR(255) NOT NULL,
    MEM_PASSWORD    VARCHAR(255) NOT NULL,
    MEM_NAME        VARCHAR(255) NOT NULL,
    MEM_EMAIL       VARCHAR(255) NOT NULL,
    MEM_TEL         VARCHAR(255) NOT NULL,
    MEM_NICKNAME    VARCHAR(255) NOT NULL,
    MEM_ADDRESS     VARCHAR(255) NOT NULL,
    CONSTRAINT MEM_ID PRIMARY KEY (MEM_ID)
);

SELECT * FROM public.MEMBERSHIP

DELETE FROM public.MEMBERSHIP WHERE "MEM_ID" = '특정 아이디';   /* MEMBERSHIP 테이블의 특정 행만 삭제 */

DELETE FROM public.MEMBERSHIP;   /* MEMBERSHIP 테이블의 행을 전부 삭제 */

DROP TABLE IF EXISTS public.MEMBERSHIP;