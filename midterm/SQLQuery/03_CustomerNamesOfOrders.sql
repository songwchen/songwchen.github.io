select
	o.OrderID,
	c.CompanyName
from Orders as o
join Customers as c on c.CustomerID = o.CustomerID
order by o.OrderID