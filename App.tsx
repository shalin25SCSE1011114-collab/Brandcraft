
import React, { useState, useCallback } from 'react';
import { UserInput, BrandIdentity, AppState } from './types';
import InputForm from './components/InputForm';
import BrandDisplay from './components/BrandDisplay';
import { generateBrandIdentity } from './services/geminiService';

const App: React.FC = () => {
  const [input, setInput] = useState<UserInput>({
    industry: '',
    targetAudience: '',
    brandTone: '',
  });

  const [identity, setIdentity] = useState<BrandIdentity | null>(null);
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleGenerate = useCallback(async () => {
    setState(AppState.LOADING);
    setErrorMessage('');
    
    try {
      const result = await generateBrandIdentity(input);
      setIdentity(result);
      setState(AppState.SUCCESS);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "An unexpected error occurred while generating the identity.");
      setState(AppState.ERROR);
    }
  }, [input]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      {/* Header */}
      <header className="text-center mb-16">
        <div className="inline-block p-3 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 mb-6">
          <i className="fas fa-compass text-3xl"></i>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          BrandCraft <span className="text-indigo-600 underline decoration-indigo-200 decoration-8 underline-offset-4">AI</span>
        </h1>
        <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Architect professional brand identities with clinical precision. Our AI-driven consultant builds cohesive, business-ready foundations for your next venture.
        </p>
      </header>

      <main className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Sidebar Input Area */}
        <div className="lg:col-span-5">
          <InputForm 
            input={input} 
            setInput={setInput} 
            onSubmit={handleGenerate} 
            isLoading={state === AppState.LOADING} 
          />
          
          {state === AppState.ERROR && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-start gap-3">
              <i className="fas fa-exclamation-circle mt-1"></i>
              <p className="text-sm font-medium">{errorMessage}</p>
            </div>
          )}
        </div>

        {/* Results Area */}
        <div className="lg:col-span-7">
          {state === AppState.IDLE && (
            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 p-12 text-center bg-white/50">
              <i className="fas fa-fingerprint text-6xl mb-6 opacity-20"></i>
              <h3 className="text-xl font-bold mb-2">Ready for Genesis</h3>
              <p className="max-w-xs text-sm">Input your industry and audience details to the left to initiate the branding synthesis process.</p>
            </div>
          )}

          {state === AppState.LOADING && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-500 animate-pulse bg-white border border-slate-100 rounded-xl shadow-sm">
              <div className="relative w-20 h-20 mb-8">
                <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-lg font-semibold text-slate-700">Analyzing Market Positioning...</p>
              <p className="text-sm mt-2">Synthesizing semantic identity markers</p>
            </div>
          )}

          {state === AppState.SUCCESS && identity && (
            <BrandDisplay identity={identity} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 pt-12 border-t border-slate-200 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} BrandCraft AI Global Consultants. All strategic assets reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Charter</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Strategic Terms</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Academic Licensing</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
