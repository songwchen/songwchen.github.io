select
	p.ProductName,
	case
		when p.UnitsInStock < p.UnitsOnOrder then '�Ѥ����D'
		else '���`'
	end as Status
from Products as p