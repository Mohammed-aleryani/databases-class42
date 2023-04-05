## 1) Columns violate 1NF rlue.
* member_id column has duplicate records.
* dinner_date column domain has changed.
* food_code and food_description have multiple values.
***
## 2)Entities that can make from the table:

- Members
- Dinner
- venue_code
- Order(food)
- Dishes.

***
### 3) Names of  all the tables and columns that would make a 3NF compliant solution.

* Member(member_id, member_name, member_adress ).

* Dinner(dinner_id, dinner_date, member_id, venue_id,order_id).
* Venue(venue_id, venue_description)
* Order(order_id,order_description)
* order_to_dishes(id, order_id, dishe_id)
* dishes(dishe_id, dishe_name)