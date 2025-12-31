import { Link } from "wouter";
import { useLogs } from "@/hooks/use-logs";
import { format } from "date-fns";
import { ArrowLeft, Trophy, Calendar, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Logs() {
  const { data: logs, isLoading, error } = useLogs();

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 rounded-full hover:bg-white hover:shadow-sm transition-all text-slate-500">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-display font-bold text-slate-800">Learning Progress</h1>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl">
            Unable to load logs. Please try again later.
          </div>
        ) : logs && logs.length > 0 ? (
          <div className="grid gap-4">
            {logs.map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${log.score === log.totalQuestions ? "bg-yellow-100 text-yellow-600" : "bg-slate-100 text-slate-500"}
                  `}>
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-700 text-lg">Quiz Attempt</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {log.completedAt ? format(new Date(log.completedAt), "PPP p") : "Unknown Date"}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-display font-bold text-primary">
                    {log.score} <span className="text-sm text-muted-foreground font-body font-normal">/ {log.totalQuestions}</span>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Score</div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-600">No Attempts Yet</h3>
            <p className="text-slate-400">Complete a quiz to see progress here!</p>
          </div>
        )}
      </div>
    </div>
  );
}
