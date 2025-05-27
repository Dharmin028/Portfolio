import { useState, useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// Initialize EmailJS with your public key
emailjs.init(EMAILJS_PUBLIC_KEY);

const formSchema = z.object({
  user_name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  user_email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_name: '',
      user_email: '',
      subject: '',
      message: '',
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY
      );

      form.reset();
      setIsSuccess(true);
      toast({
        title: 'Success!',
        description: 'Your message has been sent successfully.',
      });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
      console.error('FAILED...', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[60vh]">
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full space-y-8 sm:space-y-12 transition-all duration-1000 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          {isVisible && (
            <>
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary">Contact Me</h2>
                <div className="mt-2 h-1 w-16 sm:w-20 bg-primary mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 justify-items-center w-full max-w-7xl mx-auto">
                <Card className="md:col-span-2 w-full max-w-xl mx-auto">
                  <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <MessageSquare className="h-5 w-5" />
                      Send a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <Form {...form}>
                      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="user_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="user_email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="Subject of your message" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Your message here..." 
                                  className="min-h-32" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className={cn(
                            "w-full gap-2 transition-all duration-300",
                            isSuccess && "bg-green-500 hover:bg-green-600"
                          )}
                          disabled={isSubmitting || isSuccess}
                        >
                          {isSuccess ? (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              Message Sent!
                            </>
                          ) : isSubmitting ? (
                            <>
                              <Send className="h-4 w-4 animate-pulse" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                <Card className="w-full max-w-xs mx-auto">
                  <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <Mail className="h-5 w-5" />
                      Contact Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6 space-y-4">
                    <div>
                      <p className="font-medium text-sm sm:text-base">Email</p>
                      <a 
                        href="mailto:dharminrajkotiya2005@gmail.com" 
                        className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all"
                      >
                        dharminrajkotiya2005@gmail.com
                      </a>
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">Connect</p>
                      <div className="flex space-x-3 mt-2 justify-center">
                        <a
                          href="https://github.com/Dharmin028"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="h-5 w-5" />
                          <span className="sr-only">GitHub</span>
                        </a>
                        <a
                          href="https://linkedin.com/in/dharmin-rajkotiya/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                        <a
                          href="mailto:dharminrajkotiya2005@gmail.com"
                          className="p-2 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Mail className="h-5 w-5" />
                          <span className="sr-only">Email</span>
                        </a>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs sm:text-sm text-muted-foreground text-center">
                        I'll get back to you as soon as possible. Feel free to connect with me on social media as well.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;