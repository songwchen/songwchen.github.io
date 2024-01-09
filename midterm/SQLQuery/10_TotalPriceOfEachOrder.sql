select
	od.OrderID,
	sum(od.UnitPrice * od.Quantity * (1-od.Discount)) as OrderPrice
from [Order Details] as od
group by od.OrderID