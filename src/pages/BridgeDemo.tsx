import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Progress } from '../components/ui/progress';
import { 
  GitBranch, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  Shield, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap,
  Network
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';

interface Chain {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  color: string;
}

interface BridgeRoute {
  id: string;
  name: string;
  time: string;
  fee: string;
  rating: number;
  supported: boolean;
}

const BridgeDemo: React.FC = () => {
  const [sourceChain, setSourceChain] = useState<string>('ton');
  const [targetChain, setTargetChain] = useState<string>('solana');
  const [amount, setAmount] = useState<string>('');
  const [selectedRoute, setSelectedRoute] = useState<string>('frogmixer');
  const [isBridging, setIsBridging] = useState(false);
  const [bridgeComplete, setBridgeComplete] = useState(false);
  const [bridgeStep, setBridgeStep] = useState(0);

  const chains: Chain[] = [
    { id: 'ton', name: 'TON Network', symbol: 'TON', icon: '🪙', color: 'bg-blue-500' },
    { id: 'solana', name: 'Solana', symbol: 'SOL', icon: '🟣', color: 'bg-purple-500' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: '♦️', color: 'bg-gray-500' },
    { id: 'bsc', name: 'BNB Chain', symbol: 'BNB', icon: '🟡', color: 'bg-yellow-500' },
    { id: 'polygon', name: 'Polygon', symbol: 'MATIC', icon: '🟪', color: 'bg-indigo-500' },
  ];

  const bridgeRoutes: BridgeRoute[] = [
    { id: 'frogmixer', name: 'Frogmixer Aggregator', time: '3-5 min', fee: '0.1%', rating: 98, supported: true },
    { id: 'wormhole', name: 'Wormhole', time: '15-20 min', fee: '0.15%', rating: 92, supported: true },
    { id: 'allbridge', name: 'Allbridge', time: '10-15 min', fee: '0.2%', rating: 88, supported: true },
    { id: 'layerzero', name: 'LayerZero', time: '5-8 min', fee: '0.12%', rating: 95, supported: false },
  ];

  const bridgeSteps = [
    'Initiating bridge transaction',
    'Locking tokens on source chain',
    'Validating cross-chain proof',
    'Minting tokens on target chain',
    'Bridge completed successfully'
  ];

  const getChainData = (chainId: string) => chains.find(c => c.id === chainId);
  const getRouteData = (routeId: string) => bridgeRoutes.find(r => r.id === routeId);

  const sourceChainData = getChainData(sourceChain);
  const targetChainData = getChainData(targetChain);
  const routeData = getRouteData(selectedRoute);

  const estimatedValue = amount ? (parseFloat(amount) * 2.45).toFixed(2) : '0.00';
  const estimatedFee = amount && routeData ? (parseFloat(amount) * parseFloat(routeData.fee.replace('%', '')) / 100).toFixed(4) : '0.00';
  const estimatedReceive = amount && routeData ? (parseFloat(amount) - parseFloat(estimatedFee)).toFixed(4) : '0.00';

  const handleBridge = async () => {
    setIsBridging(true);
    setBridgeStep(0);
    
    // Simulate bridge process
    for (let i = 0; i <= 4; i++) {
      setBridgeStep(i);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    setIsBridging(false);
    setBridgeComplete(true);
    setTimeout(() => setBridgeComplete(false), 5000);
  };

  const handleSwapChains = () => {
    const temp = sourceChain;
    setSourceChain(targetChain);
    setTargetChain(temp);
  };

  return (
    <div className="container mx-auto px-4 lg:px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge className="bg-blue-100 text-blue-700 border-blue-300">
            <GitBranch className="h-4 w-4 mr-2" />
            Bridge
          </Badge>
          <h1 className="text-3xl lg:text-4xl font-bold text-emerald-800 dark:text-emerald-200">
            Cross-Chain Bridge Aggregator
          </h1>
          <p className="text-lg text-emerald-600 dark:text-emerald-400 max-w-3xl mx-auto">
            Move your assets across different blockchains with optimized routes, best fees, and maximum security
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bridge Interface */}
          <div className="lg:col-span-2">
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GitBranch className="h-5 w-5 text-emerald-600" />
                  <span>Bridge Assets</span>
                </CardTitle>
                <CardDescription>
                  Transfer tokens between supported blockchains with the best available routes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Chain Selection */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div className="md:col-span-2">
                    <Label className="text-emerald-700 dark:text-emerald-300 mb-2 block">From Chain</Label>
                    <Select value={sourceChain} onValueChange={setSourceChain}>
                      <SelectTrigger className="border-emerald-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {chains.map((chain) => (
                          <SelectItem key={chain.id} value={chain.id}>
                            <div className="flex items-center space-x-2">
                              <span>{chain.icon}</span>
                              <span>{chain.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSwapChains}
                      className="rounded-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-emerald-700 dark:text-emerald-300 mb-2 block">To Chain</Label>
                    <Select value={targetChain} onValueChange={setTargetChain}>
                      <SelectTrigger className="border-emerald-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {chains.map((chain) => (
                          <SelectItem key={chain.id} value={chain.id}>
                            <div className="flex items-center space-x-2">
                              <span>{chain.icon}</span>
                              <span>{chain.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Visual Chain Connection */}
                <div className="flex items-center justify-center space-x-4 py-4">
                  {sourceChainData && (
                    <div className="flex items-center space-x-2">
                      <div className={`p-3 ${sourceChainData.color} rounded-full`}>
                        <span className="text-white text-lg">{sourceChainData.icon}</span>
                      </div>
                      <span className="font-medium text-emerald-700 dark:text-emerald-300">
                        {sourceChainData.name}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex-1 relative">
                    <div className="border-t-2 border-emerald-300 relative">
                      <GitBranch className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 p-1 h-8 w-8 text-emerald-600" />
                    </div>
                  </div>
                  
                  {targetChainData && (
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-emerald-700 dark:text-emerald-300">
                        {targetChainData.name}
                      </span>
                      <div className={`p-3 ${targetChainData.color} rounded-full`}>
                        <span className="text-white text-lg">{targetChainData.icon}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Amount Input */}
                <div className="space-y-3">
                  <Label className="text-emerald-700 dark:text-emerald-300">Amount to Bridge</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="border-emerald-200 pr-16"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-emerald-600">
                      {sourceChainData?.symbol}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-emerald-600 dark:text-emerald-400">
                    <span>Balance: 125.50 {sourceChainData?.symbol}</span>
                    <span>≈ ${estimatedValue} USD</span>
                  </div>
                </div>

                <Separator className="bg-emerald-200/50" />

                {/* Route Selection */}
                <div className="space-y-4">
                  <Label className="text-emerald-700 dark:text-emerald-300">Bridge Route</Label>
                  <div className="space-y-3">
                    {bridgeRoutes.map((route) => (
                      <div
                        key={route.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedRoute === route.id
                            ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950'
                            : 'border-emerald-200 hover:border-emerald-300'
                        } ${!route.supported ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => route.supported && setSelectedRoute(route.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              selectedRoute === route.id ? 'bg-emerald-500' : 'bg-gray-300'
                            }`}></div>
                            <div>
                              <p className="font-medium text-emerald-800 dark:text-emerald-200">
                                {route.name}
                                {!route.supported && (
                                  <Badge variant="secondary" className="ml-2 text-xs">
                                    Not Supported
                                  </Badge>
                                )}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-emerald-600 dark:text-emerald-400">
                                <span className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{route.time}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <DollarSign className="h-3 w-3" />
                                  <span>{route.fee}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <TrendingUp className="h-3 w-3" />
                                  <span>{route.rating}% Success</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          {route.id === 'frogmixer' && (
                            <Badge className="bg-emerald-100 text-emerald-700">
                              Recommended
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bridge Summary */}
                {amount && routeData && (
                  <div className="space-y-3 p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg">
                    <h4 className="font-medium text-emerald-800 dark:text-emerald-200">Bridge Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-emerald-600 dark:text-emerald-400">You send:</span>
                        <span className="text-emerald-800 dark:text-emerald-200">
                          {amount} {sourceChainData?.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-600 dark:text-emerald-400">Bridge fee:</span>
                        <span className="text-emerald-800 dark:text-emerald-200">
                          {estimatedFee} {sourceChainData?.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-600 dark:text-emerald-400">You receive:</span>
                        <span className="text-emerald-800 dark:text-emerald-200">
                          {estimatedReceive} {targetChainData?.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-600 dark:text-emerald-400">Est. time:</span>
                        <span className="text-emerald-800 dark:text-emerald-200">
                          {routeData.time}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bridge Button */}
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={handleBridge}
                  disabled={!amount || !routeData?.supported || isBridging}
                >
                  {isBridging ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Bridging...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <GitBranch className="h-4 w-4" />
                      <span>Bridge Assets</span>
                    </div>
                  )}
                </Button>

                {/* Bridge Progress */}
                {isBridging && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                        Bridge in Progress
                      </h4>
                      <Progress value={(bridgeStep / 4) * 100} className="w-full" />
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">
                        Step {bridgeStep + 1} of 5: {bridgeSteps[bridgeStep]}
                      </p>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {bridgeComplete && (
                  <Alert className="border-emerald-200 bg-emerald-50">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <AlertDescription className="text-emerald-700">
                      Bridge completed successfully! Your assets have been transferred to {targetChainData?.name}.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Information Panel */}
          <div className="space-y-6">
            {/* Bridge Benefits */}
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-200">
                  <Zap className="h-5 w-5" />
                  <span>Bridge Benefits</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-700 dark:text-emerald-300">
                        Secure Bridging
                      </p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Multi-signature validation with fraud proofs
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-700 dark:text-emerald-300">
                        Best Rates
                      </p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Aggregated liquidity for optimal fees
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Network className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-emerald-700 dark:text-emerald-300">
                        Multi-Chain
                      </p>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        Support for 5+ major blockchains
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supported Chains */}
            <Card className="border-emerald-200/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-200">
                  <Network className="h-5 w-5" />
                  <span>Supported Chains</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chains.map((chain) => (
                  <div key={chain.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 ${chain.color} rounded-full`}>
                        <span className="text-white text-sm">{chain.icon}</span>
                      </div>
                      <span className="font-medium text-emerald-700 dark:text-emerald-300">
                        {chain.name}
                      </span>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                      Active
                    </Badge>
                  </div>
                ))}
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

export default BridgeDemo;
