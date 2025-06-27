import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Progress } from '../components/ui/progress';
import { 
  Zap, 
  Timer, 
  Shield, 
  Eye, 
  Shuffle, 
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Gauge,
  TrendingUp
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

interface Token {
  symbol: string;
  name: string;
  chain: string;
  balance: string;
  mixFee: string;
  icon: string;
}

const FastMixerDemo: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<string>('TON');
  const [amount, setAmount] = useState<string>('');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [isMixing, setIsMixing] = useState(false);
  const [mixComplete, setMixComplete] = useState(false);
  const [mixStep, setMixStep] = useState(0);
  const [countdown, setCountdown] = useState(90);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const tokens: Token[] = [
    { symbol: 'TON', name: 'Toncoin', chain: 'TON', balance: '125.50', mixFee: '0.1%', icon: '🪙' },
    { symbol: 'SOL', name: 'Solana', chain: 'Solana', balance: '45.20', mixFee: '0.15%', icon: '🟣' },
    { symbol: 'ETH', name: 'Ethereum', chain: 'Ethereum', balance: '3.75', mixFee: '0.2%', icon: '♦️' },
    { symbol: 'USDT', name: 'Tether USD', chain: 'Multi', balance: '1,250.00', mixFee: '0.1%', icon: '💰' },
  ];

  const mixingSteps = [
    'Initializing fast mixer protocol',
    'Fragmenting transaction inputs',
    'Routing through privacy pools',
    'Obfuscating transaction patterns',
    'Finalizing mixed output'
  ];

  const getTokenData = (symbol: string) => tokens.find(t => t.symbol === symbol);
  const tokenData = getTokenData(selectedToken);
  const estimatedFee = amount && tokenData ? (parseFloat(amount) * parseFloat(tokenData.mixFee.replace('%', '')) / 100).toFixed(4) : '0.00';
  const estimatedReceive = amount && tokenData ? (parseFloat(amount) - parseFloat(estimatedFee)).toFixed(4) : '0.00';

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCountdownActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountdownActive(false);
      setMixComplete(true);
      setIsMixing(false);
      setTimeout(() => setMixComplete(false), 5000);
    }
    return () => clearInterval(interval);
  }, [isCountdownActive, countdown]);

  const handleStartMixing = async () => {
    setIsMixing(true);
    setMixStep(0);
    setCountdown(90);
    
    // Simulate mixing steps
    for (let i = 0; i < 5; i++) {
      setMixStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsCountdownActive(true);
  };

  const generateRandomAddress = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 48; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRecipientAddress(result);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
            <Zap className="h-4 w-4 mr-2" />
            Fast Mixer
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-emerald-800 dark:text-emerald-200">
            Lightning-Fast 90s Mixer
          </h1>
          <p className="text-lg text-emerald-600 dark:text-emerald-400 max-w-2xl mx-auto">
            Experience instant privacy with our revolutionary 90-second mixing protocol. 
            Fast, secure, and completely decentralized.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mixing Interface */}
          <div className="lg:col-span-2">
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <span>Fast Mixer</span>
                  <Badge className="bg-yellow-100 text-yellow-700">90s</Badge>
                </CardTitle>
                <CardDescription>
                  Mix your tokens in just 90 seconds with our optimized privacy protocol
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Token Selection */}
                <div className="space-y-3">
                  <Label className="text-emerald-700 dark:text-emerald-300">Select Token</Label>
                  <Select value={selectedToken} onValueChange={setSelectedToken}>
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
                  {tokenData && (
                    <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400">
                      <span>Balance: {tokenData.balance} {tokenData.symbol}</span>
                      <span>Mix Fee: {tokenData.mixFee}</span>
                    </div>
                  )}
                </div>

                {/* Amount Input */}
                <div className="space-y-3">
                  <Label className="text-emerald-700 dark:text-emerald-300">Amount to Mix</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="border-emerald-200 pr-16"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-emerald-600">
                      {selectedToken}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {['25%', '50%', '75%', 'MAX'].map((percent) => (
                        <Button
                          key={percent}
                          variant="outline"
                          size="sm"
                          className="text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                          onClick={() => {
                            if (tokenData) {
                              const balance = parseFloat(tokenData.balance);
                              let percentage;
                              switch(percent) {
                                case '25%': percentage = 0.25; break;
                                case '50%': percentage = 0.5; break;
                                case '75%': percentage = 0.75; break;
                                case 'MAX': percentage = 1; break;
                                default: percentage = 0;
                              }
                              setAmount((balance * percentage).toFixed(4));
                            }
                          }}
                        >
                          {percent}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recipient Address */}
                <div className="space-y-3">
                  <Label className="text-emerald-700 dark:text-emerald-300">Recipient Address</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter recipient address..."
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                      className="border-emerald-200"
                    />
                    <Button 
                      variant="outline"
                      onClick={generateRandomAddress}
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    >
                      Generate
                    </Button>
                  </div>
                </div>

                <Separator className="bg-emerald-200/50" />

                {/* Mix Summary */}
                {amount && (
                  <div className="space-y-3 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200 flex items-center space-x-2">
                      <Timer className="h-4 w-4" />
                      <span>Fast Mix Summary</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-yellow-600 dark:text-yellow-400">Amount:</span>
                        <span className="text-yellow-800 dark:text-yellow-200">
                          {amount} {selectedToken}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-600 dark:text-yellow-400">Mix fee:</span>
                        <span className="text-yellow-800 dark:text-yellow-200">
                          {estimatedFee} {selectedToken}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-600 dark:text-yellow-400">You receive:</span>
                        <span className="text-yellow-800 dark:text-yellow-200">
                          {estimatedReceive} {selectedToken}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-600 dark:text-yellow-400">Mix time:</span>
                        <span className="text-yellow-800 dark:text-yellow-200 flex items-center space-x-1">
                          <Zap className="h-3 w-3" />
                          <span>90 seconds</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mix Button */}
                <Button
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                  onClick={handleStartMixing}
                  disabled={!amount || !recipientAddress || isMixing || isCountdownActive}
                >
                  {isMixing || isCountdownActive ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>
                        {isCountdownActive ? `Mixing... ${formatTime(countdown)}` : 'Initializing...'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4" />
                      <span>Start Fast Mix</span>
                    </div>
                  )}
                </Button>

                {/* Mixing Progress */}
                {(isMixing || isCountdownActive) && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                        {isCountdownActive ? 'Fast Mixing in Progress' : 'Preparing Mix'}
                      </h4>
                      {!isCountdownActive ? (
                        <>
                          <Progress value={(mixStep / 4) * 100} className="w-full" />
                          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">
                            Step {mixStep + 1} of 5: {mixingSteps[mixStep]}
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="relative">
                            <Progress value={((90 - countdown) / 90) * 100} className="w-full" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-medium text-emerald-700">
                                {formatTime(countdown)} remaining
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-center space-x-2 mt-3">
                            <Gauge className="h-4 w-4 text-yellow-600 animate-pulse" />
                            <span className="text-sm text-emerald-600 dark:text-emerald-400">
                              Fast mixing protocol active
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {mixComplete && (
                  <Alert className="border-emerald-200 bg-emerald-50">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <AlertDescription className="text-emerald-700">
                      Fast mix completed in 90 seconds! Your tokens have been mixed and sent with complete privacy.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            {/* Fast Mix Benefits */}
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-200">
                  <Timer className="h-5 w-5" />
                  <span>Fast Mix Benefits</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-700 dark:text-emerald-300">
                        Lightning Speed
                      </p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Complete privacy in just 90 seconds
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-700 dark:text-emerald-300">
                        Secure Protocol
                      </p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Advanced cryptographic mixing
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Eye className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-700 dark:text-emerald-300">
                        Complete Privacy
                      </p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Untraceable transaction patterns
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mix Statistics */}
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-200">
                  <TrendingUp className="h-5 w-5" />
                  <span>Mix Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-600 dark:text-emerald-400">Success Rate:</span>
                    <Badge className="bg-emerald-100 text-emerald-700">99.8%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-600 dark:text-emerald-400">Avg Mix Time:</span>
                    <Badge className="bg-yellow-100 text-yellow-700">87s</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-600 dark:text-emerald-400">Total Mixed:</span>
                    <Badge className="bg-blue-100 text-blue-700">$2.5M</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-600 dark:text-emerald-400">Privacy Level:</span>
                    <Badge className="bg-green-100 text-green-700">Maximum</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-200">
                  <Shuffle className="h-5 w-5" />
                  <span>How It Works</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-3">
                  {mixingSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Demo Notice */}
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700">
                Please confirm your recipent address correct . Transaction can't be reverse . 
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FastMixerDemo;
