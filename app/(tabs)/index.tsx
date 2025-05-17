import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Platform,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

// Enable WebBrowser redirect handling for auth
WebBrowser.maybeCompleteAuthSession();

const HOSTED_URL = "https://necxis-asign-g95e.vercel.app";

export default function App() {
  const webviewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Handle back button on Android
  useEffect(() => {
    if (Platform.OS === "android") {
      const backAction = () => {
        if (webviewRef.current) {
          webviewRef.current.goBack();
          return true; // Prevent default behavior
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }
  }, []);

  // Handle navigation state changes
  const handleNavigationStateChange = (newNavState: any) => {
    const { url, loading } = newNavState;

    if (!url) return;

    setLoading(loading);

    // If we navigate to dashboard, consider it authenticated
    if (url.includes("/dashboard")) {
      setAuthenticated(true);
    }

    console.log("NavigationState:", url);

    // Handle auth redirects
    if (
      url.includes("firebaseapp.com/auth/handler") ||
      url.includes("accounts.google.com")
    ) {
      // For Firebase auth redirects, we need to handle this
      webviewRef.current?.injectJavaScript(`
        if (typeof window !== 'undefined') {
          // Keep track of this URL for recovery
          localStorage.setItem('auth_redirect_url', window.location.href);
          
          // Redirect back to our app's callback page
          window.location.href = '${HOSTED_URL}/auth-callback';
        }
        true;
      `);
    }
  };

  // Handle messages from WebView
  const onMessage = (event: any) => {
    const message = event.nativeEvent.data;
    console.log("Message from WebView:", message);

    if (message === "auth-success") {
      setAuthenticated(true);
      Alert.alert("Login Successful!");

      // Ensure we navigate to dashboard
      webviewRef.current?.injectJavaScript(`
        if (window.location.pathname !== '/dashboard') {
          window.location.href = '${HOSTED_URL}/dashboard';
        }
        true;
      `);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && !authenticated && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: 10,
          }}
        >
          <ActivityIndicator size="large" color="#000000" />
          <Text style={{ marginTop: 10, fontSize: 16 }}>Loading...</Text>
        </View>
      )}

      <WebView
        ref={webviewRef}
        source={{ uri: HOSTED_URL }}
        style={{ flex: 1 }}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={onMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        originWhitelist={["*"]}
        allowsInlineMediaPlayback
        allowsBackForwardNavigationGestures
        startInLoadingState
        incognito={false} // We need to keep cookies
        cacheEnabled={true}
        injectedJavaScript={`
          // Setup WebView communication
          (function() {
            // Detect if we're on dashboard
            function checkAuth() {
              if (window.location.pathname === '/dashboard') {
                if (window.ReactNativeWebView) {
                  window.ReactNativeWebView.postMessage('auth-success');
                }
              }
            }
            
            // Run immediately
            checkAuth();
            
            // Handle Firebase auth redirects
            if (window.location.href.includes('firebaseapp.com/auth/handler')) {
              // Save info to localStorage
              localStorage.setItem('firebase_auth_redirect', window.location.href);
              
              // Navigate back to our app
              window.location.href = '${HOSTED_URL}/auth-callback';
            }
          })();
          true;
        `}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView HTTP error:", nativeEvent);
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error:", nativeEvent);
          Alert.alert("Error", "Failed to load the app");
        }}
      />
    </SafeAreaView>
  );
}
