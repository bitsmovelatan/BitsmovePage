import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Linking, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { globalStyles, colors } from '../styles/globalStyles';

export default function ClaimTokensScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  const { user, token, API_URL, updateUser } = useAuth();
  const { t } = useLanguage();

  const hasClaimed = user?.tokensReceived && user.tokensReceived > 0;

  const handleClaimTokens = () => {
    Alert.alert(
      'Claim Tokens',
      'To claim tokens, you need to connect your wallet using WalletConnect. This feature requires a Web3 wallet like MetaMask mobile. Would you like to proceed with a simulated claim?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Simulate Claim', onPress: simulateClaim },
      ]
    );
  };

  const simulateClaim = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Generate a dummy wallet address for simulation
      const dummyWallet = '0x' + Math.random().toString(16).substring(2, 42);

      const response = await axios.post(
        `${API_URL}/token/claim`,
        { walletAddress: dummyWallet },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSuccess('Tokens claimed successfully! 🎉');
        setTransactionHash(response.data.transactionHash);

        // Update user data
        const updatedUser = { ...user };
        updatedUser.walletAddress = dummyWallet;
        updatedUser.tokensReceived = 1000;
        await updateUser(updatedUser);

        setTimeout(() => {
          navigation.navigate('Dashboard');
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to claim tokens. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openPolygonscan = () => {
    if (transactionHash) {
      Linking.openURL(`https://mumbai.polygonscan.com/tx/${transactionHash}`);
    }
  };

  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={styles.content}>
      <View style={globalStyles.card}>
        <Text style={styles.icon}>🎁</Text>
        <Text style={globalStyles.heading}>{t('dashboard.claimTokens')}</Text>

        {error ? (
          <View style={globalStyles.error}>
            <Text style={globalStyles.errorText}>{error}</Text>
          </View>
        ) : null}

        {success ? (
          <View style={globalStyles.success}>
            <Text style={globalStyles.successText}>{success}</Text>
          </View>
        ) : null}

        {hasClaimed ? (
          <View>
            <View style={globalStyles.success}>
              <Text style={globalStyles.successText}>
                You have already claimed your tokens!
              </Text>
            </View>
            <Text style={styles.tokenAmount}>1000 FERT</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.claimInfo}>
              Connect your wallet to claim your FertilityTokens
            </Text>
            <Text style={styles.tokenAmount}>🪙 1000 FERT</Text>
            <Text style={styles.infoText}>
              You will receive 1000 FertilityTokens to help support your journey.
              These tokens are yours to keep and use within the platform.
            </Text>

            <TouchableOpacity
              style={[globalStyles.button, loading && styles.buttonDisabled]}
              onPress={handleClaimTokens}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={globalStyles.buttonText}>Claim Tokens</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {transactionHash && (
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionText}>✓ Transaction confirmed!</Text>
            <TouchableOpacity onPress={openPolygonscan}>
              <Text style={styles.link}>View on PolygonScan →</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Instructions */}
      <View style={globalStyles.card}>
        <Text style={styles.instructionsTitle}>How it works</Text>
        <View style={styles.step}>
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.stepText}>
            Connect your MetaMask or compatible Web3 wallet
          </Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.stepText}>
            Make sure you're on the Polygon Mumbai testnet
          </Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepNumber}>3</Text>
          <Text style={styles.stepText}>
            Click "Claim Tokens" to receive 1000 FERT tokens
          </Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepNumber}>4</Text>
          <Text style={styles.stepText}>
            Confirm the transaction in your wallet
          </Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepNumber}>5</Text>
          <Text style={styles.stepText}>
            Wait for the transaction to be confirmed
          </Text>
        </View>

        <View style={styles.note}>
          <Text style={styles.noteText}>
            <Text style={styles.noteStrong}>Note:</Text> You can only claim tokens once per account. 
            Make sure your wallet address is correct before claiming.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  icon: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 16,
  },
  claimInfo: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  tokenAmount: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 24,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  transactionInfo: {
    marginTop: 24,
    padding: 16,
    backgroundColor: colors.bgSecondary,
    borderRadius: 8,
  },
  transactionText: {
    fontSize: 16,
    color: colors.success,
    textAlign: 'center',
    marginBottom: 8,
  },
  link: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 16,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    backgroundColor: colors.primary,
    color: '#fff',
    borderRadius: 14,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '600',
    marginRight: 12,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    paddingTop: 2,
  },
  note: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#fef3c7',
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    borderRadius: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
  noteStrong: {
    fontWeight: '700',
  },
});

