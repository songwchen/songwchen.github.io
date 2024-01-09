select
	orderID,
	year(OrderDate) as OrderYear
from Orders
where year(OrderDate) = 1998