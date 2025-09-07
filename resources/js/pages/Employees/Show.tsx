import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon, EditIcon, CalendarIcon, MailIcon, UserIcon } from 'lucide-react';

interface Employee {
    id: number;
    name: string;
    email: string;
    gender: 'male' | 'female';
    created_at: string;
    updated_at: string;
}

interface Props {
    employee: Employee;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employees',
        href: '/employees',
    },
    {
        title: 'Details',
        href: '#',
    },
];

export default function EmployeesShow({ employee }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={employee.name} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link href="/employees">
                        <Button variant="outline" size="sm">
                            <ArrowLeftIcon className="mr-2 h-4 w-4" />
                            Back to Employees
                        </Button>
                    </Link>
                    <Link href={`/employees/${employee.id}/edit`}>
                        <Button size="sm">
                            <EditIcon className="mr-2 h-4 w-4" />
                            Edit Employee
                        </Button>
                    </Link>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserIcon className="h-5 w-5" />
                            Employee Details
                        </CardTitle>
                        <CardDescription>
                            View employee information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    Name
                                </label>
                                <p className="text-lg font-semibold">{employee.name}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <MailIcon className="h-4 w-4" />
                                    Email
                                </label>
                                <p className="text-lg">{employee.email}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">
                                    Gender
                                </label>
                                <div>
                                    <Badge 
                                        variant={employee.gender === 'male' ? 'default' : 'secondary'}
                                        className="capitalize text-sm"
                                    >
                                        {employee.gender}
                                    </Badge>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <CalendarIcon className="h-4 w-4" />
                                        Created At
                                    </label>
                                    <p className="text-sm">
                                        {new Date(employee.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <CalendarIcon className="h-4 w-4" />
                                        Last Updated
                                    </label>
                                    <p className="text-sm">
                                        {new Date(employee.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
