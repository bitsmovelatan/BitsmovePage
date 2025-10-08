import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { globalStyles, colors } from '../styles/globalStyles';

export default function DashboardScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigation.replace('Home');
  };

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={styles.content}>
      <Text style={styles.welcome}>
        {t('dashboard.welcome')}, {user?.name}! 👋
      </Text>

      {/* Token Info Card */}
      <View style={globalStyles.card}>
        <Text style={styles.cardIcon}>🪙</Text>
        <Text style={styles.cardTitle}>{t('dashboard.tokens')}</Text>
        <Text style={styles.tokenAmount}>{user?.tokensReceived || 0} FERT</Text>
        
        {(user?.tokensReceived || 0) === 0 ? (
          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => navigation.navigate('ClaimTokens')}
          >
            <Text style={globalStyles.buttonText}>{t('dashboard.claimTokens')}</Text>
          </TouchableOpacity>
        ) : (
          <View style={globalStyles.success}>
            <Text style={globalStyles.successText}>✓ Tokens claimed</Text>
          </View>
        )}
      </View>

      {/* Wallet Info Card */}
      <View style={globalStyles.card}>
        <Text style={styles.cardIcon}>👛</Text>
        <Text style={styles.cardTitle}>Wallet Address</Text>
        {user?.walletAddress ? (
          <Text style={styles.walletAddress}>
            {`${user.walletAddress.substring(0, 6)}...${user.walletAddress.substring(user.walletAddress.length - 4)}`}
          </Text>
        ) : (
          <Text style={styles.infoText}>Connect your wallet to claim tokens</Text>
        )}
      </View>

      {/* Profile Card */}
      <View style={globalStyles.card}>
        <Text style={styles.cardIcon}>👤</Text>
        <Text style={styles.cardTitle}>Profile</Text>
        <View style={styles.profileInfo}>
          <Text style={styles.profileLabel}>Email:</Text>
          <Text style={styles.profileValue}>{user?.email}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileLabel}>Language:</Text>
          <Text style={styles.profileValue}>
            {user?.language === 'en' ? 'English' : 'Español'}
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Stories')}
        >
          <Text style={styles.actionIcon}>✍️</Text>
          <Text style={styles.actionText}>Share Your Story</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('ClaimTokens')}
        >
          <Text style={styles.actionIcon}>🎁</Text>
          <Text style={styles.actionText}>Claim Tokens</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={[globalStyles.button, globalStyles.buttonSecondary, { marginTop: 20 }]}
        onPress={handleLogout}
      >
        <Text style={[globalStyles.buttonText, globalStyles.buttonSecondaryText]}>
          {t('nav.logout')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  cardIcon: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  tokenAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 16,
  },
  walletAddress: {
    fontFamily: 'monospace',
    fontSize: 16,
    backgroundColor: colors.bgSecondary,
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
    marginVertical: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  profileLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  profileValue: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  quickActions: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  actionCard: {
    backgroundColor: colors.bgPrimary,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

