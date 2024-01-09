select
	p.ProductName,
	case
		when p.UnitsInStock < p.UnitsOnOrder then '供不應求'
		else '正常'
	end as Status
from Products as p