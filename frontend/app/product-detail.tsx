import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { productsAPI } from '../utils/api';

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await productsAPI.getById(id as string);
      setProduct(response.data);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactForProduct = () => {
    const message = `Hi, I'm interested in ${product?.name}`;
    Linking.openURL(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      
      {product.featured && (
        <View style={styles.featuredBadge}>
          <Ionicons name="star" size={16} color="#FFF" />
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.category}>{product.category}</Text>
        </View>

        <View style={styles.priceSection}>
          <Text style={styles.price}>₹{product.price}</Text>
          {product.inStock ? (
            <View style={styles.stockBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.inStockText}>In Stock</Text>
            </View>
          ) : (
            <View style={styles.stockBadge}>
              <Ionicons name="close-circle" size={16} color="#F44336" />
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Features</Text>
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <Ionicons name="shield-checkmark" size={20} color="#D4AF37" />
              <Text style={styles.featureText}>100% Authentic</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="return-down-back" size={20} color="#D4AF37" />
              <Text style={styles.featureText}>Easy Returns</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="ribbon" size={20} color="#D4AF37" />
              <Text style={styles.featureText}>Quality Assured</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={contactForProduct}
        >
          <Ionicons name="logo-whatsapp" size={20} color="#FFF" />
          <Text style={styles.contactButtonText}>Contact Us for Purchase</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
  },
  productImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#F0F0F0',
  },
  featuredBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#D4AF37',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  featuredText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 24,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  inStockText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  outOfStockText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F44336',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  features: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#666',
  },
  contactButton: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});
