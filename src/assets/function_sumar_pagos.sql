
drop function sumar_pagos;

CREATE FUNCTION sumar_pagos(codigo INTEGER, tipo VARCHAR(3))
RETURNS DECIMAL(10,2) DETERMINISTIC
BEGIN
	DECLARE valortotal DECIMAL(10,2);

	IF tipo = 'DEP' THEN
        select sum(valorpagocuotalote) into valortotal from pagos p where p.estado = '1' and p.codigodeposito = codigo;
    END IF;
    
    IF tipo = 'CUO' THEN
        select sum(valorpagocuotalote) into valortotal from pagos p where p.estado = '1' and p.codigocuota = codigo;
    END IF;
   
   IF tipo = 'REU' THEN
        select sum(valorpagocuotalote) into valortotal from pagos p where p.estado = '1' and p.codigoreunion = codigo;
    END IF;

	RETURN valortotal;
END
;

select * from pagos;

select sumar_pagos(362, 'DEP');
select sumar_pagos(8, 'CUO');
select sumar_pagos(5, 'REU');

