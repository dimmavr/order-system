import datetime
from rest_framework.response import Response

from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
# Create your views here.
from rest_framework import viewsets , filters
from .models import Customer, Item, Order, OrderItem, Payment
from .serializers import (CustomerSerializer,
    ItemSerializer,
    OrderSerializer,
    OrderItemSerializer,
    PaymentSerializer
)

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name', 'phone','tax_id']
    filterset_fields = ['first_name', 'last_name', 'phone','tax_id']


    @action(detail=True,methods=['get'])
    def debt(self,request,pk=None):
        customer = self.get_object()
        
        try:
             # Βρίσκουμε τον πελάτη από το ID που δόθηκε στο URL
             customer=Customer.objects.get(pk=pk)
        except Customer.DoesNotExist:
            return Response({"error": "Ο πελάτης δεν βρέθηκε"}, status=404)
        
        #Παίρνουμε όλες τις παραγγελίες του πελάτη
        orders = Orders.objects.filter(customer=customer)

        # Υπολογίζουμε το συνολικό ποσό παραγγελιών
        total_orders = sum(order.total_amount() for order in orders)
        # Παίρνουμε όλες τις πληρωμές του πελάτη
        payments = Payment.objects.filter(order__customer=customer)

        # Υπολογίζουμε πόσα έχει πληρώσει
        total_paid = sum(payment.amount for payment in payments)

        # Υπολογίζουμε τι χρωστάει
        remaining = total_orders - total_paid

        # Επιστρέφουμε τα δεδομένα σαν JSON
        return Response({
            "customer": customer.first_name + " " + customer.last_name,
            "total_orders": total_orders,
            "total_paid": total_paid,
            "debt": remaining
        })



            

    

    





class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

    @action(detail=False, methods=['get'])  # Δημιουργεί custom endpoint π.χ. /api/items/top_selling/
    def top_selling(self, request):
        # Φέρνουμε όλα τα OrderItem από τη βάση
        all_order_items = OrderItem.objects.all()


        # Δημιουργούμε ένα κενό λεξικό για να αποθηκεύσουμε το σύνολο των ποσοτήτων ανά είδος
        stats = {} 
        for order_item in all_order_items:
            name = order_item.item.name  # Παίρνουμε το όνομα του είδους, π.χ. "Laptop"
            qty = order_item.quantity

            # Αν το είδος υπάρχει ήδη στο λεξικό, προσθέτουμε την ποσότητα
            if name in stats:
                stats[name]+=qty
            else:
                # Αλλιώς, ξεκινάμε με την πρώτη καταγραφή ποσότητας
                stats[name] = qty

        # Ταξινομούμε τα είδη από το πιο πουλημένο προς το λιγότερο
        sorted_stats = sorted(stats.items(), key=lambda x: x[1], reverse=True)[:5]
        # Μετατρέπουμε τα αποτελέσματα σε λεξικό για να τα επιστρέψουμε
        result = {name: qty for name, qty in sorted_stats}

        # Επιστρέφουμε την απάντηση σαν JSON
        return Response (result)
    


    @action(detail=False, methods=['get'])  # Δημιουργεί URL τύπου /api/items/sold_by_date/
    def sold_by_date(self, request):
        # Παίρνουμε την ημερομηνία από το URL, π.χ. ?date=2025-06-30
        date_str = request.query_params.get('date')

        # Αν δεν δόθηκε ημερομηνία, επιστρέφουμε μήνυμα λάθους
        if not date_str:
            return Response({"error": "Δώσε ημερομηνία με ?date=YYYY-MM-DD"}, status=400)

        try:
            # Μετατρέπουμε το string σε τύπο ημερομηνίας
            date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
        except:
            return Response({"error": "Λάθος μορφή ημερομηνίας"}, status=400)

        # Παίρνουμε όλα τα OrderItem που έχουν παραγγελθεί αυτή την ημέρα
        items_today = OrderItem.objects.filter(order__date=date_obj)

        # Μετράμε πόσα τεμάχια πουλήθηκαν για κάθε είδος
        sold = {}
        for item in items_today:
            name = item.item.name
            qty = item.quantity

            if name in sold:
                sold[name] += qty  # προσθέτουμε ποσότητα αν υπάρχει ήδη
            else:
                sold[name] = qty   # αν είναι πρώτη φορά, το βάζουμε

        # Επιστρέφουμε το αποτέλεσμα
        return Response(sold)
    
    



    




class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['customer', 'date']  # φίλτρο ανά πελάτη ή ημερομηνία
    search_fields = ['customer__first_name', 'customer__last_name']


    
    @action(detail=True, methods=['get'])  # detail=True γιατί αφορά μια συγκεκριμένη παραγγελία
    def summary(self, request, pk=None):
        try:
            # Βρίσκουμε την παραγγελία με βάση το ID από το URL
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"error": "Η παραγγελία δεν βρέθηκε"}, status=404)

        # Παίρνουμε τα είδη της παραγγελίας
        items = order.items.all()
        items_data = [{
            "item": item.item.name,
            "quantity": item.quantity,
            "price": item.price
        } for item in items]

        # Παίρνουμε τις πληρωμές της παραγγελίας
        payments = order.payments.all()
        payments_data = [{
            "amount": p.amount,
            "date": p.date
        } for p in payments]

        # Επιστρέφουμε τα στοιχεία της παραγγελίας
        return Response({
            "order_id": order.id,
            "customer": order.customer.first_name + " " + order.customer.last_name,
            "date": order.date,
            "total_amount": order.total_amount(),
            "paid_amount": order.paid_amount(),
            "remaining_amount": order.remaining_amount(),
            "is_paid": order.is_paid(),
            "items": items_data,
            "payments": payments_data
        })
    




class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    @action(detail=False, methods=['get'])  # detail=False γιατί αφορά πολλές παραγγελίες
    def today(self, request):
        # Παίρνουμε την σημερινή ημερομηνία
        today_date = datetime.date.today()

        # Φιλτράρουμε τις παραγγελίες που έχουν ημερομηνία σήμερα
        todays_orders = Order.objects.filter(date=today_date)

        # Τις μετατρέπουμε σε JSON με τον serializer
        serializer = self.get_serializer(todays_orders, many=True)

        # Επιστρέφουμε τα δεδομένα
        return Response(serializer.data)















class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['order', 'item', 'order__date']







class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['date', 'amount', 'order']


    @action(detail=False, methods=['get'])  # Πολλαπλές πληρωμές (όχι μία)
    def today(self, request):
        # Παίρνουμε τη σημερινή ημερομηνία
        today = datetime.date.today()

        # Φιλτράρουμε τις πληρωμές που έγιναν σήμερα
        todays_payments = Payment.objects.filter(date=today)

        # Τις μετατρέπουμε σε JSON
        serializer = self.get_serializer(todays_payments, many=True)

        # Επιστρέφουμε τα δεδομένα
        return Response(serializer.data)
