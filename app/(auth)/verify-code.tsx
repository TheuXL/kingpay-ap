import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useRouter } from 'expo-router';
import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import BackIcon from '@/images/icon_back.svg';

export default function VerifyCodeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Esqueci a senha</ThemedText>
      </View>
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>Digite o código enviado para seu email</ThemedText>
        
        <View style={styles.codeContainer}>
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="number-pad" />
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="number-pad" />
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="number-pad" />
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="number-pad" />
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="number-pad" />
          <TextInput style={styles.codeInput} maxLength={1} keyboardType="number-pad" />
        </View>
        <TouchableOpacity style={styles.verifyButton}>
          <ThemedText style={styles.verifyButtonText}>Confirmar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  backArrow: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: [{ translateX: -12 }],
    fontFamily: 'Inter',
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Inter',
    color: '#2A2AFF',
  },
 
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    top: '20',
    marginBottom: 40,
  },
  codeInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: '#f0f4ff',
    fontFamily: 'Inter',
  },
  verifyButton: {
    backgroundColor: '#2A2AFF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    top: '50',
    marginBottom: 40,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
});
