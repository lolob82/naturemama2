import json
import boto3
import os
from datetime import datetime
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
ses = boto3.client('ses')

table_name = os.environ['ORDERS_TABLE']
sender_email = os.environ['SENDER_EMAIL']

def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

def generate_order_id():
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    return f"NM{timestamp}"

def create_email_html(order_data, order_id):
    items_html = ""
    for item in order_data['items']:
        items_html += f"""
        <tr>
            <td style="padding: 15px; border-bottom: 1px solid #e8e6e3;">
                <div style="font-size: 16px; color: #7a9070; font-weight: 600; margin-bottom: 5px;">
                    {item['name']}
                </div>
                <div style="font-size: 14px; color: #8b7355;">
                    {item['line']}
                </div>
            </td>
            <td style="padding: 15px; border-bottom: 1px solid #e8e6e3; text-align: center;">
                {item['quantity']}
            </td>
            <td style="padding: 15px; border-bottom: 1px solid #e8e6e3; text-align: right;">
                {item['price']}€
            </td>
            <td style="padding: 15px; border-bottom: 1px solid #e8e6e3; text-align: right; font-weight: 600;">
                {item['price'] * item['quantity']:.2f}€
            </td>
        </tr>
        """
    
    customer = order_data['customer']
    
    html = f"""
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de commande - NatureMama Heritage</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #f5f3f0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f3f0; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #9caf88 0%, #7a9070 100%); padding: 40px 30px; text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-family: 'Playfair Display', Georgia, serif; font-size: 32px; font-weight: 600;">
                                    NatureMama Heritage
                                </h1>
                                <p style="margin: 10px 0 0; color: rgba(255,255,255,0.95); font-size: 14px; font-style: italic;">
                                    La force de la nature pour votre bien-être
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Success Message -->
                        <tr>
                            <td style="padding: 40px 30px; text-align: center;">
                                <div style="width: 80px; height: 80px; background-color: #9caf88; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                                    <span style="color: white; font-size: 40px;">✓</span>
                                </div>
                                <h2 style="margin: 0 0 15px; color: #7a9070; font-family: 'Playfair Display', Georgia, serif; font-size: 28px;">
                                    Commande confirmée !
                                </h2>
                                <p style="margin: 0; color: #8b7355; font-size: 16px; line-height: 1.6;">
                                    Merci pour votre confiance. Votre commande a été enregistrée avec succès.
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Order Info -->
                        <tr>
                            <td style="padding: 0 30px 30px;">
                                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f3f0; border-radius: 8px; padding: 20px;">
                                    <tr>
                                        <td style="padding: 10px 0;">
                                            <strong style="color: #7a9070;">Numéro de commande:</strong>
                                            <span style="color: #3a3a3a; margin-left: 10px;">{order_id}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0;">
                                            <strong style="color: #7a9070;">Date:</strong>
                                            <span style="color: #3a3a3a; margin-left: 10px;">{datetime.now().strftime('%d/%m/%Y à %H:%M')}</span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Delivery Address -->
                        <tr>
                            <td style="padding: 0 30px 30px;">
                                <h3 style="margin: 0 0 15px; color: #7a9070; font-size: 18px;">Adresse de livraison</h3>
                                <div style="background-color: #faf9f7; border: 1px solid #e8e6e3; border-radius: 8px; padding: 20px;">
                                    <p style="margin: 0 0 8px; color: #3a3a3a; font-weight: 600;">{customer['fullName']}</p>
                                    <p style="margin: 0 0 8px; color: #8b7355;">{customer['streetNumber']} {customer['street']}</p>
                                    <p style="margin: 0 0 8px; color: #8b7355;">{customer['postalCode']} {customer['city']}</p>
                                    <p style="margin: 0 0 8px; color: #8b7355;">Tél: {customer['phone']}</p>
                                    <p style="margin: 0; color: #8b7355;">Email: {customer['email']}</p>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Order Items -->
                        <tr>
                            <td style="padding: 0 30px 30px;">
                                <h3 style="margin: 0 0 15px; color: #7a9070; font-size: 18px;">Détails de la commande</h3>
                                <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e8e6e3; border-radius: 8px; overflow: hidden;">
                                    <thead>
                                        <tr style="background-color: #f5f3f0;">
                                            <th style="padding: 15px; text-align: left; color: #7a9070; font-weight: 600;">Produit</th>
                                            <th style="padding: 15px; text-align: center; color: #7a9070; font-weight: 600;">Qté</th>
                                            <th style="padding: 15px; text-align: right; color: #7a9070; font-weight: 600;">Prix unit.</th>
                                            <th style="padding: 15px; text-align: right; color: #7a9070; font-weight: 600;">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items_html}
                                    </tbody>
                                    <tfoot>
                                        <tr style="background-color: #f5f3f0;">
                                            <td colspan="3" style="padding: 20px; text-align: right; font-weight: 600; color: #7a9070; font-size: 18px;">
                                                Total
                                            </td>
                                            <td style="padding: 20px; text-align: right; font-weight: 600; color: #7a9070; font-size: 18px;">
                                                {order_data['total']:.2f}€
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="background-color: #3a3a3a; padding: 30px; text-align: center;">
                                <p style="margin: 0 0 10px; color: #9caf88; font-family: 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: 600;">
                                    NatureMama Heritage
                                </p>
                                <p style="margin: 0 0 15px; color: #f5f3f0; font-size: 12px; font-style: italic;">
                                    La force de la nature pour votre bien-être
                                </p>
                                <p style="margin: 0; color: #a89080; font-size: 12px;">
                                    Compléments alimentaires naturels • Fabriqué dans les Alpes françaises
                                </p>
                                <p style="margin: 15px 0 0; color: #a89080; font-size: 12px;">
                                    © 2026 NatureMama Heritage. Tous droits réservés.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """
    return html

def lambda_handler(event, context):
    try:
        # Parse request body
        body = json.loads(event['body'])
        
        # Generate order ID
        order_id = generate_order_id()
        
        # Prepare order data for DynamoDB
        order_data = {
            'orderId': order_id,
            'customer': body['customer'],
            'items': body['items'],
            'total': Decimal(str(body['total'])),
            'orderDate': body['orderDate'],
            'status': 'confirmed',
            'createdAt': datetime.now().isoformat()
        }
        
        # Save to DynamoDB
        table = dynamodb.Table(table_name)
        table.put_item(Item=order_data)
        
        # Send confirmation email
        email_html = create_email_html(body, order_id)
        
        ses.send_email(
            Source=sender_email,
            Destination={
                'ToAddresses': [body['customer']['email']]
            },
            Message={
                'Subject': {
                    'Data': f'Confirmation de commande #{order_id} - NatureMama Heritage',
                    'Charset': 'UTF-8'
                },
                'Body': {
                    'Html': {
                        'Data': email_html,
                        'Charset': 'UTF-8'
                    }
                }
            }
        )
        
        # Return success response
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            'body': json.dumps({
                'message': 'Commande enregistrée avec succès',
                'orderId': order_id
            }, default=decimal_default)
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Erreur lors du traitement de la commande',
                'details': str(e)
            })
        }
