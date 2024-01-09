select top 9
	o.OrderID,
	o.OrderDate
from orders as o
order by o.OrderDate desc