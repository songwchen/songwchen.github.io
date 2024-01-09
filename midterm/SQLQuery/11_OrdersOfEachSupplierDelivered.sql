select
	s.CompanyName as SupplierName,
	count(od.OrderID) as OrdersDelivered
from Suppliers as s
join Products as p on p.SupplierID = s.SupplierID
join [Order Details] as od on od.ProductID = p.ProductID
group by s.CompanyName