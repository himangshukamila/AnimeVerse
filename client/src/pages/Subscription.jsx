import { motion } from "framer-motion";
import { Check, Crown, Zap, Sparkles } from "lucide-react";
import { useState } from "react";
import { userService } from "../services/userService";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const Subscription = () => {
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(null);

  const plans = [
    {
      name: "Free",
      price: "$0",
      icon: Sparkles,
      color: "from-gray-500 to-gray-600",
      features: [
        "Watch with ads",
        "SD quality (480p)",
        "Limited catalog",
        "Single device",
        "Community access",
      ],
    },
    {
      name: "Premium",
      price: "$9.99",
      icon: Zap,
      color: "from-primary-500 to-primary-600",
      features: [
        "Ad-free experience",
        "HD quality (1080p)",
        "Full catalog access",
        "Watch on 2 devices",
        "Download episodes",
        "Early access to new releases",
      ],
      popular: true,
    },
    {
      name: "Ultimate",
      price: "$14.99",
      icon: Crown,
      color: "from-purple-500 to-pink-600",
      features: [
        "Everything in Premium",
        "4K Ultra HD quality",
        "Watch on 4 devices",
        "Offline downloads",
        "Exclusive content",
        "Priority support",
        "Manga access",
        "Virtual events access",
      ],
    },
  ];

  const handleSubscribe = async (planName) => {
    try {
      setLoading(planName);
      const data = await userService.updateSubscription(planName.toLowerCase());
      updateUser({ ...user, subscription: data.subscription });
      toast.success(`Subscribed to ${planName} plan!`);
    } catch (error) {
      toast.error("Failed to update subscription");
    } finally {
      setLoading(null);
    }
  };

  const currentPlan = user?.subscription?.plan || "free";

  return (
    <div className="min-h-screen pt-32 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Choose Your Plan
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Unlock unlimited anime streaming with our flexible subscription
            plans. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isCurrentPlan = currentPlan === plan.name.toLowerCase();

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass rounded-2xl p-8 ${
                  plan.popular ? "ring-2 ring-primary-400 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-6">
                  <div
                    className={`inline-flex p-4 bg-gradient-to-br ${plan.color} rounded-2xl mb-4`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">
                    {plan.price}
                    {plan.price !== "$0" && (
                      <span className="text-lg text-gray-400">/month</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={isCurrentPlan || loading === plan.name}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    isCurrentPlan
                      ? "bg-gray-600 cursor-not-allowed"
                      : `bg-gradient-to-r ${plan.color} hover:shadow-lg glow-button`
                  }`}
                >
                  {loading === plan.name
                    ? "Processing..."
                    : isCurrentPlan
                    ? "Current Plan"
                    : "Subscribe Now"}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 glass rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">
                Can I change my plan anytime?
              </h3>
              <p className="text-gray-400 text-sm">
                Yes! You can upgrade, downgrade, or cancel your subscription at
                any time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-400 text-sm">
                We accept all major credit cards, PayPal, and various local
                payment methods.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-400 text-sm">
                The Free plan is available forever! Premium and Ultimate plans
                offer a 7-day free trial.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I share my account?</h3>
              <p className="text-gray-400 text-sm">
                Premium allows 2 simultaneous streams, Ultimate allows 4. Each
                plan supports multiple profiles.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;
