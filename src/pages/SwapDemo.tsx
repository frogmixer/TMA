import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  ArrowUpDown, 
  Info, 
  Shuffle, 
  TrendingUp, 
  Clock, 
  Shield,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

interface Token {
  symbol: string;
  name: string;
  chain: string;
  balance: string;
  price: number;
  icon: string;
}

const SwapDemo: React.FC = () => {
  const [fromToken, setFromToken] = useState<string>('TON');
  const [toToken, setToToken] = useState<string>('SOL');
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapComplete, setSwapComplete] = useState(false);

  const tokens: Token[] = [
    { symbol: 'TON', name: 'Toncoin', chain: 'TON', balance: '125.50', price: 2.45, icon: '🪙' },
    { symbol: 'SOL', name: 'Solana', chain: 'Solana', balance: '45.20', price: 98.50, icon: '🟣' },
    { symbol: 'ETH', name: 'Ethereum', chain: 'Ethereum', balance: '3.75', price: 2340.00, icon: '♦️' },
    { symbol: 'USDT', name: 'Tether USD', chain: 'Multi', balance: '1,250.00', price: 1.00, icon: '💰' },
    { symbol: 'BNB', name: 'BNB Chain', chain: 'BSC', balance: '8.90', price: 315.20, icon: '🟡' },
  ];

  const getTokenData = (symbol: string) => tokens.find(t => t.symbol === symbol);

  const handleAmountChange = (value: string, isFrom: boolean) => {
    if (isFrom) {
      setFromAmount(value);
      // Simulate price calculation
      if (value && fromToken && toToken) {
        const fromTokenData = getTokenData(fromToken);
        const toTokenData = getTokenData(toToken);
        if (fromTokenData && toTokenData) {
          const converted = (parseFloat(value) * fromTokenData.price) / toTokenData.price;
          setToAmount(converted.toFixed(6));
        }
      } else {
        setToAmount('');
      }
    } else {
      setToAmount(value);
      // Reverse calculation
      if (value && fromToken && toToken) {
        const fromTokenData = getTokenData(fromToken);
        const toTokenData = getTokenData(toToken);
        if (fromTokenData && toTokenData) {
          const converted = (parseFloat(value) * toTokenData.price) / fromTokenData.price;
          setFromAmount(converted.toFixed(6));
        }
      } else {
        setFromAmount('');
      }
    }
  };

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = async () => {
    setIsSwapping(true);
    // Simulate swap process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsSwapping(false);
    setSwapComplete(true);
    setTimeout(() => setSwapComplete(false), 5000);
  };

  const fromTokenData = getTokenData(fromToken);
  const toTokenData = getTokenData(toToken);
  const estimatedGas = '0.005';
  const swapRate = fromTokenData && toTokenData ? (fromTokenData.price / toTokenData.price).toFixed(6) : '0';

  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
            <Shuffle className="h-4 w-4 mr-2" />
            Swap Demo
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-emerald-800 dark:text-emerald-200">
            Multi-Chain Token Swaps
          </h1>
          <p className="text-lg text-emerald-600 dark:text-emerald-400 max-w-2xl mx-auto">
            Seamlessly swap tokens across different blockchains with optimized rates and privacy protection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Swap Interface */}
          <div className="lg:col-span-2">
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shuffle className="h-5 w-5 text-emerald-600" />
                  <span>Token Swap</span>
                </CardTitle>
                <CardDescription>
                  Exchange tokens across supported chains with the best available rates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* From Token */}
                <div className="space-y-3">
                  <Label className="text-emerald-700 dark:text-emerald-300">From</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Select value={fromToken} onValueChange={setFromToken}>
                      <SelectTrigger className="border-emerald-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens.map((token) => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            <div className="flex items-center space-x-2">
                              <span>{token.icon}</span>
                              <span>{token.symbol}</span>
                              <span className="text-sm text-gray-500">({token.chain})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={fromAmount}
                      onChange={(e) => handleAmountChange(e.target.value, true)}
                      className="border-emerald-200"
                    />
                  </div>
                  {fromTokenData && (
                    <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400">
                      <span>Balance: {fromTokenData.balance} {fromTokenData.symbol}</span>
                      <span>${fromTokenData.price.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSwapTokens}
                    className="rounded-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* To Token */}
                <div className="space-y-3">
                  <Label className="text-emerald-700 dark:text-emerald-300">To</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Select value={toToken} onValueChange={setToToken}>
                      <SelectTrigger className="border-emerald-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens.map((token) => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            <div className="flex items-center space-x-2">
                              <span>{token.icon}</span>
                              <span>{token.symbol}</span>
                              <span className="text-sm text-gray-500">({token.chain})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={toAmount}
                      onChange={(e) => handleAmountChange(e.target.value, false)}
                      className="border-emerald-200"
                    />
                  </div>
                  {toTokenData && (
                    <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400">
                      <span>Balance: {toTokenData.balance} {toTokenData.symbol}</span>
                      <span>${toTokenData.price.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Separator className="bg-emerald-200/50" />

                {/* Swap Details */}
                {fromAmount && toAmount && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-600 dark:text-emerald-400">Exchange Rate:</span>
                      <span className="text-emerald-800 dark:text-emerald-200">
                        1 {fromToken} = {swapRate} {toToken}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-600 dark:text-emerald-400">Estimated Gas:</span>
                      <span className="text-emerald-800 dark:text-emerald-200">
                        {estimatedGas} {fromToken}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-600 dark:text-emerald-400">Privacy Protection:</span>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        <Shield className="h-3 w-3 mr-1" />
                        Enabled
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Swap Button */}
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={handleSwap}
                  disabled={!fromAmount || !toAmount || isSwapping}
                >
                  {isSwapping ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Swapping...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Shuffle className="h-4 w-4" />
                      <span>Swap Tokens</span>
                    </div>
                  )}
                </Button>

                {/* Success Message */}
                {swapComplete && (
                  <Alert className="border-emerald-200 bg-emerald-50">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <AlertDescription className="text-emerald-700">
                      Swap completed successfully! Your tokens have been exchanged with privacy protection.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            {/* Market Info */}
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-200">
                  <TrendingUp className="h-5 w-5" />
                  <span>Market Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {tokens.slice(0, 3).map((token) => (
                    <div key={token.symbol} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span>{token.icon}</span>
                        <span className="font-medium text-emerald-700 dark:text-emerald-300">
                          {token.symbol}
                        </span>
                      </div>
                      <span className="text-emerald-600 dark:text-emerald-400">
                        ${token.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-200">
                  <Info className="h-5 w-5" />
                  <span>Swap Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-700 dark:text-emerald-300">
                        Privacy Protection
                      </p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        All swaps are privacy-protected by default
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-700 dark:text-emerald-300">
                        Fast Execution
                      </p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Swaps complete in under 2 minutes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-700 dark:text-emerald-300">
                        Best Rates
                      </p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Aggregated liquidity for optimal pricing
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Demo Notice */}
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700">
                Please don't pay the invoice twice , wait for trading confirm .
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapDemo;
